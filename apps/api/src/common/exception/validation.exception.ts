// src/common/exceptions/validation.exception.ts
import { MessageKeyType } from '@myorg/shared/i18n';
import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(data: Record<string, MessageKeyType[]>) {
    super({
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      data,
    });
  }
}
