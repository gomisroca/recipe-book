import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const PaginatedQuery = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return {
      cursor: req.query.cursor,
      take: req.query.take ? parseInt(req.query.take as string, 10) : undefined,
    };
  },
);
