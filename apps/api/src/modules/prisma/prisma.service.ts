import {
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    Logger,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger("Prisma");
    constructor() {
        const connectionString = `${process.env.DB_PROVIDER}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
        const adapter = new PrismaPg({ connectionString });
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect().then(
            () => this.logger.log("Prisma connect"),
            (data) => {
                this.logger.error(data);
            },
        );
    }

    
    async onModuleDestroy() {
        await this.$disconnect().then(
            () => this.logger.log("Prisma disconnect"),
            (data) => {
                this.logger.error(data);
            },
        );
    }
}
