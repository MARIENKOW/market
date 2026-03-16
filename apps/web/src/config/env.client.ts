import { clientEnvSchema } from "@myorg/shared/env";

// Этот файл можно импортировать ТОЛЬКО в:
//   - Server Components
//   - Route Handlers (app/api/...)
//   - Server Actions
//   - next.config.ts
//   - middleware.ts
//
// НЕ импортировать в клиентские компоненты ('use client')

const parsed = clientEnvSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("\n❌ Ошибка валидации серверных переменных окружения:\n");
    // parsed.error.errors.forEach((e) => {
    //     console.error(`   • ${e.path.join(".")}: ${e.message}`);
    // });
    throw new Error("Invalid server environment variables");
}

export const clientEnv = parsed.data;
