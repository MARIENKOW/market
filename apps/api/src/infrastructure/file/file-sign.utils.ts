import * as crypto from "crypto";
import { env } from "@/config";

const TTL_MS = 3 * 60 * 60 * 1_000; // 1 час

export function signPath(relativePath: string, ttlMs = TTL_MS): string {
    const exp = Date.now() + ttlMs;
    const sig = buildSig(relativePath, exp);
    return `${relativePath}?sig=${sig}&exp=${exp}`;
}

export function verifyPath(
    relativePath: string,
    sig: string,
    exp: string,
): void {
    const expMs = Number(exp);
    if (isNaN(expMs) || Date.now() > expMs)
        throw new Error("file.signatureExpired");

    const expected = buildSig(relativePath, expMs);
    const expectedBuf = Buffer.from(expected);
    const actualBuf = Buffer.from(sig);

    if (
        expectedBuf.length !== actualBuf.length ||
        !crypto.timingSafeEqual(expectedBuf, actualBuf)
    ) {
        throw new Error("file.signatureInvalid");
    }
}

function buildSig(relativePath: string, exp: number): string {
    return crypto
        .createHmac("sha256", env.FILE_SECRET)
        .update(`${relativePath}:${exp}`)
        .digest("hex");
}
