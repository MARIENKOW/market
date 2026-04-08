import { mapImage } from "@/infrastructure/file/img/image.mapper";
import i18nRelativeTime from "@/lib/i18n/i18nRelativeTime";
import { BlogWithImage } from "@/modules/blog/blog.types";
import { BlogDto } from "@myorg/shared/dto";

export const mapBlog = (blog: BlogWithImage): BlogDto => ({
    id: blog.id,
    title: blog.title,
    subtitle: blog.subtitle,
    body: blog.body,
    date: blog.date.toISOString(),
    time: blog.time.toISOString(),
    isMain: blog.isMain,
    isImportant: blog.isImportant,
    isShort: blog.isShort,
    image: mapImage(blog.image),
    createdAt: i18nRelativeTime(blog.createdAt),
    updatedAt: blog.updatedAt.toISOString(),
});
