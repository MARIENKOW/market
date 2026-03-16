import { serverEnvSchema, clientEnvSchema } from "@myorg/shared/env";

const parsedServer = serverEnvSchema.safeParse(process.env);
const parsedCLient = clientEnvSchema.safeParse(process.env);

if (!parsedServer.success) {
    console.error("\n❌ Ошибка валидации переменных окружения:\n");
    // parsed.error.errors.forEach((e) => {
    //     console.error(`   • ${e.path.join(".")}: ${e.message}`);
    // });
    process.exit(1);
}
if (!parsedCLient.success) {
    console.error("\n❌ Ошибка валидации переменных окружения:\n");
    // parsed.error.errors.forEach((e) => {
    //     console.error(`   • ${e.path.join(".")}: ${e.message}`);
    // });
    process.exit(1);
}

export const env = { ...parsedCLient.data, ...parsedServer.data };
