import { FileEntityType, Prisma } from "@/generated/prisma";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ValidationException } from "@/common/exception/validation.exception";
import { I18nService } from "nestjs-i18n";
import { BlogDto, PagedResult } from "@myorg/shared/dto";
import { ImageService } from "@/infrastructure/file/img/image.service";
import { BlogWithoutImageOutput } from "@myorg/shared/form";
import { mapBlog } from "@/modules/blog/blog.mapper";

const BLOG_INCLUDE = {
    image: true,
    bodyImages: { select: { id: true } },
    bodyVideos: { select: { id: true } },
} as const;

@Injectable()
export class BlogService {
    constructor(
        private prisma: PrismaService,
        private image: ImageService,
        private i18n: I18nService,
    ) {}
    private readonly logger = new Logger(BlogService.name);

    // ── helpers ──────────────────────────────────────────────────────

    private async validateBodyMedia(
        imagesId: string[],
        videosId: string[],
    ): Promise<void> {
        const errors: { message: string; type: "error" }[] = [];

        if (imagesId.length) {
            const found = await this.prisma.image.count({
                where: { id: { in: imagesId } },
            });
            if (found !== imagesId.length)
                errors.push({
                    message: this.i18n.t(
                        "pages.admin.blog.feedback.mediaImage.notFound",
                        { args: { count: imagesId.length - found } },
                    ),
                    type: "error",
                });
        }

        if (videosId.length) {
            const found = await this.prisma.video.count({
                where: { id: { in: videosId } },
            });
            if (found !== videosId.length)
                errors.push({
                    message: this.i18n.t(
                        "pages.admin.blog.feedback.mediaVideo.notFound",
                        { args: { count: videosId.length - found } },
                    ),
                    type: "error",
                });
        }

        if (errors.length) throw new ValidationException({ root: errors });
    }

    /** Удаляет файлы Image/Video из хранилища если они больше не связаны ни с одним блогом */
    private async deleteOrphanedBodyMedia(
        imageIds: string[],
        videoIds: string[],
    ): Promise<void> {
        if (imageIds.length) {
            const still = await this.prisma.image.findMany({
                where: { id: { in: imageIds } },
                select: { id: true, _count: { select: { blogBody: true } } },
            });
            await Promise.allSettled(
                still
                    .filter((img) => img._count.blogBody === 0)
                    .map((img) =>
                        this.image
                            .delete(img.id)
                            .catch((e) =>
                                this.logger.error(
                                    `Orphaned body image not removed [imageId=${img.id}]. Manual cleanup required.`,
                                    e,
                                ),
                            ),
                    ),
            );
        }
        if (videoIds.length) {
            const still = await this.prisma.video.findMany({
                where: { id: { in: videoIds } },
                select: { id: true, _count: { select: { blogBody: true } } },
            });
            // удаляем запись Video из БД (каскадно удалит preview-image если есть)
            // и потом файл из хранилища
            await Promise.allSettled(
                still
                    .filter((v) => v._count.blogBody === 0)
                    .map(async (v) => {
                        try {
                            await this.prisma.video.delete({
                                where: { id: v.id },
                            });
                        } catch (e) {
                            this.logger.error(
                                `Orphaned body video not removed from DB [videoId=${v.id}]`,
                                e,
                            );
                        }
                    }),
            );
        }
    }

    // ── CRUD ─────────────────────────────────────────────────────────

    async create(
        {
            title,
            subtitle,
            body,
            publishedAt,
            imagesId = [],
            videosId = [],
        }: BlogWithoutImageOutput,
        file: Express.Multer.File,
    ): Promise<BlogDto> {
        await this.validateBodyMedia(imagesId, videosId);

        const { id: imageId } = await this.image.upload(
            file,
            FileEntityType.BLOG_MAIN_IMAGE,
            { mode: "original" },
        );

        try {
            const blog = await this.prisma.blog.create({
                data: {
                    title,
                    subtitle,
                    body,
                    publishedAt,
                    imageId,
                    bodyImages: { connect: imagesId.map((id) => ({ id })) },
                    bodyVideos: { connect: videosId.map((id) => ({ id })) },
                },
                include: BLOG_INCLUDE,
            });

            return mapBlog(blog);
        } catch (error) {
            this.logger.error(
                `Failed to create blog, rolling back uploaded image [imageId=${imageId}]`,
                error,
            );
            await this.image
                .delete(imageId)
                .catch((e) =>
                    this.logger.error(
                        `Rollback failed: could not delete orphaned image [imageId=${imageId}]`,
                        e,
                    ),
                );
            throw error;
        }
    }

    async update({
        id,
        data,
        image,
    }: {
        id: string;
        data: BlogWithoutImageOutput & { image: string | null };
        image: Express.Multer.File | null;
    }): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: { bodyImages: true, bodyVideos: true },
        });
        if (!blog) throw new NotFoundException();

        const { title, subtitle, body, publishedAt, imagesId = [], videosId = [] } = data;

        await this.validateBodyMedia(imagesId, videosId);

        const oldImageIds = blog.bodyImages.map((i) => i.id);
        const oldVideoIds = blog.bodyVideos.map((v) => v.id);
        const removedImageIds = oldImageIds.filter(
            (i) => !imagesId.includes(i),
        );
        const removedVideoIds = oldVideoIds.filter(
            (v) => !videosId.includes(v),
        );

        let newMainImageId: string | null = null;
        if (image) {
            const imageData = await this.image.upload(
                image,
                FileEntityType.BLOG_MAIN_IMAGE,
                { mode: "original" },
            );
            newMainImageId = imageData.id;
        }

        const updateData: Prisma.BlogUpdateInput = {
            title,
            subtitle,
            body,
            publishedAt,
            ...(newMainImageId && { imageId: newMainImageId }),
            bodyImages: {
                disconnect: removedImageIds.map((i) => ({ id: i })),
                connect: imagesId
                    .filter((i) => !oldImageIds.includes(i))
                    .map((i) => ({ id: i })),
            },
            bodyVideos: {
                disconnect: removedVideoIds.map((v) => ({ id: v })),
                connect: videosId
                    .filter((v) => !oldVideoIds.includes(v))
                    .map((v) => ({ id: v })),
            },
        };

        try {
            const newBlog = await this.prisma.blog.update({
                where: { id: blog.id },
                data: updateData,
                include: BLOG_INCLUDE,
            });

            // удаляем старую главную картинку если заменили
            if (newMainImageId) {
                await this.image
                    .delete(blog.imageId)
                    .catch((e) =>
                        this.logger.error(
                            `Old main image not removed after update [imageId=${blog.imageId}]. Manual cleanup required.`,
                            e,
                        ),
                    );
            }

            // удаляем orphaned body media
            await this.deleteOrphanedBodyMedia(
                removedImageIds,
                removedVideoIds,
            );

            return mapBlog(newBlog);
        } catch (error) {
            this.logger.error(
                `Failed to update blog [id=${id}], rolling back uploaded image [imageId=${newMainImageId}]`,
                error,
            );
            if (newMainImageId) {
                await this.image
                    .delete(newMainImageId)
                    .catch((e) =>
                        this.logger.error(
                            `Rollback failed: could not delete orphaned image [imageId=${newMainImageId}]`,
                            e,
                        ),
                    );
            }
            throw error;
        }
    }

    async getAll(page: number, limit: number): Promise<PagedResult<BlogDto>> {
        const [total, blogs] = await Promise.all([
            this.prisma.blog.count(),
            this.prisma.blog.findMany({
                include: BLOG_INCLUDE,
                orderBy: [{ isMain: "desc" }, { publishedAt: "desc" }],
                skip: (page - 1) * limit,
                take: limit,
            }),
        ]);

        return {
            data: blogs.map(mapBlog),
            meta: { page, limit, total, pageCount: Math.ceil(total / limit) },
        };
    }

    async get(id: string): Promise<BlogDto> {
        const data = await this.prisma.blog.findUnique({
            where: { id },
            include: BLOG_INCLUDE,
        });
        if (!data) throw new NotFoundException();
        return mapBlog(data);
    }

    async delete(id: string): Promise<void> {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: { image: true, bodyImages: true, bodyVideos: true },
        });
        if (!blog) throw new NotFoundException();

        const mainImageId = blog.image.id;
        const bodyImageIds = blog.bodyImages.map((i) => i.id);
        const bodyVideoIds = blog.bodyVideos.map((v) => v.id);

        await this.prisma.blog.delete({ where: { id } });

        // удаляем главную картинку
        await this.image
            .delete(mainImageId)
            .catch((e) =>
                this.logger.error(
                    `Blog [id=${id}] deleted but main image [imageId=${mainImageId}] was not removed. Manual cleanup required.`,
                    e,
                ),
            );

        // удаляем orphaned body media
        await this.deleteOrphanedBodyMedia(bodyImageIds, bodyVideoIds);
    }

    async deleteAll(): Promise<void> {
        const blogs = await this.prisma.blog.findMany({
            include: { image: true, bodyImages: true, bodyVideos: true },
        });

        const mainImageIds = blogs.map((b) => b.image.id);
        const allBodyImageIds = [
            ...new Set(blogs.flatMap((b) => b.bodyImages.map((i) => i.id))),
        ];
        const allBodyVideoIds = [
            ...new Set(blogs.flatMap((b) => b.bodyVideos.map((v) => v.id))),
        ];

        await this.prisma.blog.deleteMany({
            where: { id: { in: blogs.map((b) => b.id) } },
        });

        // удаляем главные картинки
        const mainResults = await Promise.allSettled(
            mainImageIds.map((imageId) => this.image.delete(imageId)),
        );
        mainResults.forEach((result, i) => {
            if (result.status === "rejected")
                this.logger.error(
                    `Orphaned main image after deleteAll [imageId=${mainImageIds[i]}]. Manual cleanup required.`,
                    result.reason,
                );
        });

        // После deleteAll все body media гарантированно orphaned
        await this.deleteOrphanedBodyMedia(allBodyImageIds, allBodyVideoIds);
    }

    async setMain(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();

        const newValue = !blog.isMain;

        if (newValue) {
            const [, updated] = await this.prisma.$transaction([
                this.prisma.blog.updateMany({
                    where: { isMain: true, id: { not: id } },
                    data: { isMain: false },
                }),
                this.prisma.blog.update({
                    where: { id },
                    data: { isMain: true },
                    include: BLOG_INCLUDE,
                }),
            ]);
            return mapBlog(updated);
        }

        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isMain: false },
                include: BLOG_INCLUDE,
            }),
        );
    }

    async setImportant(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();
        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isImportant: !blog.isImportant },
                include: BLOG_INCLUDE,
            }),
        );
    }

    async setShort(id: string): Promise<BlogDto> {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException();
        return mapBlog(
            await this.prisma.blog.update({
                where: { id },
                data: { isShort: !blog.isShort },
                include: BLOG_INCLUDE,
            }),
        );
    }
}
