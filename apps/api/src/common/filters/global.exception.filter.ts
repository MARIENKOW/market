import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { ApiErrorResponse } from '@myorg/shared/dto';

@Catch() // Ловит ВСЁ
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = this.extractStatus(exception);
    const errorResponse = this.formatError(exception, req, status);

    this.logger.error(
      `${req.method} ${req.url} - ${errorResponse.status} ${errorResponse.message}`,
      exception instanceof Error ? exception.stack : '',
    );

    res.status(status).json(errorResponse);
  }

  private extractStatus(exception: unknown): number {
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception instanceof Error && 'status' in (exception as any)) {
      return (
        Number((exception as any).status) || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private formatError(
    exception: unknown,
    req: Request,
    status: number,
  ): ApiErrorResponse {
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    let data: Record<string, any> = {};

    if (status >= 500) {
      message = 'Internal server error';
      code = 'INTERNAL_ERROR';
    } else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const exceptionResponse =
        typeof response === 'string' ? response : (response as any);

      message = exceptionResponse.message || exception.message || 'Error';
      code =
        exceptionResponse.code ||
        exceptionResponse.statusCode ||
        this.getStatusCode(status);
      data = exceptionResponse.data || exceptionResponse.fieldErrors || {};
    }

    return {
      status,
      message,
      code,
      data,
      timestamp: new Date().toISOString(),
      path: req.url,
    };
  }

  private getStatusCode(status: number): string {
    const codes = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      422: 'VALIDATION_ERROR',
    };
    return codes[status as keyof typeof codes] || 'ERROR';
  }
}
