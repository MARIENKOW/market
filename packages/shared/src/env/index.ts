// import { config } from "dotenv";
// import { EnvSchema } from "./shema";
// import type { EnvType } from "./shema";

// export function loadConfig(): EnvType {
//     // Загружаем .env
//     if (process.env.NODE_ENV !== "production") {
//         config(); // dev только
//     }

//     // Проверяем + типизируем
//     const parsed = EnvSchema.parse(process.env);
//     return parsed;
// }