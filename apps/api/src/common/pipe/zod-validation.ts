import { ValidationException } from "@/common/exception/validation.exception";
import { MessageKeyType } from "@myorg/shared/i18n";
import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodType } from "zod";

import { ZodError } from "zod";

export function zodIssuesToFieldErrors(error: ZodError) {
    const fieldErrors: Record<string, MessageKeyType[]> = {};

    for (const issue of error.issues) {
        console.log(issue.path);
        const field = issue.path.join(".") || "root.server";

        if (!fieldErrors[field]) {
            fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message as MessageKeyType);
    }

    return fieldErrors;
}

export class ZodValidationPipe<S extends ZodType> implements PipeTransform {
    constructor(private schema: S) {}

    transform(value: unknown) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            throw new ValidationException({
                fields: zodIssuesToFieldErrors(result.error),
            });
        }
        return result.data;
    }
}
