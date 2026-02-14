import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
    new TransformInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
