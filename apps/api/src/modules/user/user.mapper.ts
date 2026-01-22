import { User } from '@/generated/prisma';
import { UserDto } from '@myorg/shared/dto';

export const mapUser = (user: User): UserDto => ({
  id: user.id,
  email: user.email,
});
