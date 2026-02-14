import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface TransformResponse<T> {
  status: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  TransformResponse<T>
> {
  intercept(
    _: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse<T>> {
    return next.handle().pipe(map((data: T) => ({ status: 'success', data })));
  }
}
