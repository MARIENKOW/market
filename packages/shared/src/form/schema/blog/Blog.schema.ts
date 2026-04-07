import { z } from "zod";
import { getMessageKey } from "../../../i18n";
import { BLOG_IMAGE_CONFIG } from "../../constants";
import { BlogBody, BlogSubtitle, BlogTitle } from "../../fields";

export const BlogSchema = z.object({
    image: z
        .union([z.instanceof(File), z.string()])
        .nullable()
        .refine((f) => f !== null, getMessageKey("form.required"))
        .refine(
            (f) =>
                !(f instanceof File) ||
                BLOG_IMAGE_CONFIG.allowedMimeTypes.includes(f.type),
            getMessageKey("form.file.unsupportedType"),
        )
        .refine(
            (f) =>
                !(f instanceof File) ||
                f.size <= BLOG_IMAGE_CONFIG.maxFileSizeBytes,
            getMessageKey("form.file.blogImage.tooLarge"),
        ),
    title: BlogTitle,
    subtitle: BlogSubtitle,
    imagesId: z.array(z.string()).optional(),
    videosId: z.array(z.string()).optional(),
    body: BlogBody,
});

export type BlogInput = z.input<typeof BlogSchema>;
export type BlogOutput = z.output<typeof BlogSchema>;
