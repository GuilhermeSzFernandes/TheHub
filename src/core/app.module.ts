import { Module, HttpStatus } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

import { PostModule } from '../modules/post/post.module';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TiktokModule } from '../integrations/tiktok/tiktok.module';

import { PrismaService } from '../database/prisma.service';
import { PostService } from 'src/modules/post/post.service';
import { UsersService } from 'src/modules/users/users.service';

import { TikTokAuthController } from 'src/integrations/tiktok/auth/tiktok-auth.controller';

@Module({
  imports: [UsersModule, PostModule, AuthModule, TiktokModule],
  providers: [providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }), PrismaService, UsersService, PostService],
})
export class AppModule {}
