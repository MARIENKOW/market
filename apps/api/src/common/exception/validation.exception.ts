// src/common/exceptions/validation.exception.ts
import { MessageKeyType } from '@myorg/shared/i18n';
import { BadRequestException } from '@nestjs/common';

type ValidationErrors<T extends Record<string, any>> = {
  [K in keyof T]?: MessageKeyType[];
} & {
  'root.server'?: MessageKeyType[];
};

export class ValidationException<
  T extends Record<string, any>,
> extends BadRequestException {
  constructor(data: ValidationErrors<T>) {
    super({
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      data,
    });
  }
}
