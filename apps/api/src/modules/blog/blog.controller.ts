import { ENDPOINT, FULL_PATH_ENDPOINT } from "@myorg/shared/endpoints";
import { Controller } from "@nestjs/common";

import { BlogService } from "@/modules/blog/blog.service";

const {} = ENDPOINT.blog;
const { path } = FULL_PATH_ENDPOINT.blog;

@Controller(path)
export class BlogController {
    constructor(private blog: BlogService) {}
}
