import { Module } from '@nestjs/common';
import { TikTokAuthController } from './auth/tiktok-auth.controller';
import { TiktokService } from './tiktok.service';
import { TiktokAuthService } from './auth/tiktok-auth.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TikTokAuthController],
  providers: [TiktokService, TiktokAuthService, PrismaService]
})
export class TiktokModule {}
