import { HttpStatus, Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { PrismaService } from './prisma.service.js';
import { UsersService } from './modules/users/users.service.js';
import { PostService } from './modules/post/post.service.js';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { AuthModule } from './modules/auth/auth.module.js';
import { AuthService } from './modules/auth/auth.service.js';

@Module({
  imports: [UsersModule, PostModule, AuthModule],
  providers: [providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }), PrismaService, UsersService, PostService],
})
export class AppModule {}
