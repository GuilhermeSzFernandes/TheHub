import 'dotenv/config'; 
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';
import * as express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.use(express.static(join(process.cwd(), 'src', 'public')));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
