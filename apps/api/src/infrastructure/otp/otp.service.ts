import { OTP_CODE_LENGTH } from "@myorg/shared/dto";
import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class OtpService {
    constructor() {
        // Секрет для HMAC — обязательно в env, не хардкодим
    }

    /** Генерирует числовой OTP код заданной длины */
    generate(): string {
        const max = Math.pow(10, OTP_CODE_LENGTH);
        // crypto.randomInt — криптографически безопасный CSPRNG
        const code = crypto.randomInt(0, max);
        return code.toString().padStart(OTP_CODE_LENGTH, "0");
    }
}
