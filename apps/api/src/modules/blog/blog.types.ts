import { Prisma } from "@/generated/prisma";

export type BlogWithImage = Prisma.BlogGetPayload<{
    include: { image: true };
}>;
