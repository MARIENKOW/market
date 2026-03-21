export const OTP_CODE_LENGTH = 6;
export const OTP_CODE_TTL_MINUTES = 15;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_MAX_RESENDS = 5;

/**
 * Длительность блокировки попытки смены пароля в миллисекундах.
 * Используется и на сервере (сравнение дат) и на клиенте (таймер обратного отсчёта).
 * blockedUntil = blockedAt + OTP_BLOCK_DURATION_MS
 */
export const OTP_BLOCK_DURATION_MS = 30 * 60 * 1000; // 30 минут
