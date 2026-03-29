import { Controller } from "@nestjs/common";
import { ImageService } from "./image.service";
import { UPLOADS_IMAGE_ROOT } from "@/infrastructure/img/image.config";

@Controller(UPLOADS_IMAGE_ROOT)
export class ImageController {
    constructor(private readonly imageService: ImageService) {}
}
