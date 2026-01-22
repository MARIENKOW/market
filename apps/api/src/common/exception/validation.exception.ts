// src/common/exceptions/validation.exception.ts
import { FieldsErrors } from "@myorg/shared/dto";
import { BadRequestException } from "@nestjs/common";

export class ValidationException<
    T extends Record<string, any>,
> extends BadRequestException {
    constructor(data: FieldsErrors<T>) {
        super({
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            data,
        });
    }
}
