import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from '@/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator<
  keyof UserEntity | undefined, // input type (optional property name)
  UserEntity | undefined // return type
>((data, ctx: ExecutionContext): UserEntity | undefined => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request.user;
  return data ? (user?.[data] as UserEntity | undefined) : user;
});
