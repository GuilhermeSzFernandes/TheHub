import 'dotenv/config'; 
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.use('/.well-known', express.static(join(__dirname, '..', 'public')));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  }));

  await app.listen(process.env.PORT);
}
bootstrap();
