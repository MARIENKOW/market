import { ImageDto } from "./ImageDto";

export interface BlogDto {
    id: string;
    title: string;
    subtitle: string | null;
    body: string;
    date: string;
    time: string;
    isMain: boolean;
    isImportant: boolean;
    isShort: boolean;
    image: ImageDto;
    createdAt: string;
    updatedAt: string;
}
