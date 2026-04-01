import { mapImage } from "@/infrastructure/img/image.mapper";
import { UserWithAvatar } from "@/modules/user/user.types";
import { UserDto } from "@myorg/shared/dto";

export const mapUser = (user: UserWithAvatar): UserDto => ({
    id: user.id,
    email: user.email,
    theme: user.theme,
    locale: user.locale,
    avatar: user.avatar ? mapImage(user.avatar) : null,
});
