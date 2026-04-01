import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) {}
    private readonly logger = new Logger(BlogService.name);
}
