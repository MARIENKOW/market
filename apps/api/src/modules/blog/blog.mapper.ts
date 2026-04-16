import { mapImage } from "@/infrastructure/file/img/image.mapper";
import i18nRelativeTime from "@/lib/i18n/i18nRelativeTime";
import i18nSmartDate from "@/lib/i18n/i18nSmartDate";
import { BlogWithImage } from "@/modules/blog/blog.types";
import { BlogDto } from "@myorg/shared/dto";

export const mapBlog = (blog: BlogWithImage): BlogDto => ({
    id: blog.id,
    title: blog.title,
    subtitle: blog.subtitle,
    body: blog.body,
    publishedAt: blog.publishedAt.toISOString(),
    publishedAtHumanize: i18nSmartDate(blog.publishedAt),
    isMain: blog.isMain,
    isImportant: blog.isImportant,
    isShort: blog.isShort,
    image: mapImage(blog.image),
    bodyImagesId: blog.bodyImages.map((i) => i.id),
    bodyVideosId: blog.bodyVideos.map((v) => v.id),
    createdAt: i18nSmartDate(blog.createdAt),
    updatedAt: blog.updatedAt.toISOString(),
});
