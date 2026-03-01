import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma.module.js';
import { TikTokAuthController } from './tiktok.controller.js';

@Module({
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '1h'},
  })],
  providers: [AuthService],
  controllers: [AuthController, TikTokAuthController]
})
export class AuthModule {}
