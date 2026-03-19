import { HashService } from "../src/infrastructure/hash/hash.service";
import { SeedSchema } from "@myorg/shared/src/form/schema/SeedSchema";
import { env } from "../src/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaPg({ connectionString: env.DB_URL });
const prisma = new PrismaClient({ adapter });

const hash = new HashService();

async function main() {
    const existing = await prisma.admin.findFirst({
        where: { role: "SUPERADMIN" },
    });

    if (existing) {
        console.log("✅ Superadmin already exists, skipping");
        return;
    }

    const parsed = SeedSchema.safeParse({
        email: env.SUPERADMIN_EMAIL,
        password: env.SUPERADMIN_PASSWORD,
    });

    if (!parsed.success) {
        console.error("❌ Ошибка валидации env-переменных:");
        console.error(parsed.error.flatten().fieldErrors);
        process.exit(1);
    }

    const { email, password } = parsed.data;
    const passwordHash = await hash.hash(password);

    await prisma.admin.create({
        data: {
            email,
            passwordHash,
            role: "SUPERADMIN",
            status: "ACTIVE",
            updatedAt: new Date(),
        },
    });

    console.log(`✅ Superadmin created: ${email}`);
}

main()
    .catch(console.error)
    .finally(async () => {
        console.log("finaly");
        await prisma.$disconnect();
    });
