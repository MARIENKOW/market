import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserService } from "@/modules/user/user.service";
import { getMessageKey } from "@myorg/shared/i18n";
import { UserLoginDtoOutput, UserRegisterDtoOutput } from "@myorg/shared/form";
import { SessionUserService } from "@/modules/session/user/session.user.service";
import { User, UserSession } from "@/generated/prisma";
import { ValidationException } from "@/common/exception/validation.exception";
import { mapUser } from "@/modules/user/user.mapper";
import { UserDto } from "@myorg/shared/dto";

@Injectable()
export class AuthUserService {
    constructor(
        private user: UserService,
        private sessionUser: SessionUserService,
    ) {}

    async register(body: UserRegisterDtoOutput): Promise<User> {
        const { password, email } = body;

        const emailUnique = await this.user.findByEmail(email);
        if (emailUnique)
            throw new ValidationException<UserRegisterDtoOutput>({
                fields: {
                    email: ["form.email.unique"],
                },
            });

        const hashed = await bcrypt.hash(password, 12);

        return this.user.create({
            id: "dasd",
            status: "NOACTIVE",
            createdAt: new Date(),
            updatedAt: new Date(),
            email,
            passwordHash: hashed,
        });
    }

    async login(body: UserLoginDtoOutput): Promise<UserSession> {
        const { email, password } = body;
        const user = await this.user.findByEmail(email);
        if (!user)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: { email: ["form.email.invalid"] },
            });

        // fields: {
        //     email: ["form.email.notFound"],
        // },
        if (!user.passwordHash)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid)
            throw new ValidationException<UserLoginDtoOutput>({
                fields: {
                    password: ["form.password.invalid"],
                },
            });
        return this.sessionUser.create(user.id);
    }

    async logout(sessionId: string): Promise<true> {
        return await this.sessionUser.delete(sessionId);
    }
}
