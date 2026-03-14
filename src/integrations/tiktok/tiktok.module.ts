import { Module } from '@nestjs/common';
import { TikTokAuthController } from './auth/tiktok-auth.controller';
import { TiktokService } from './tiktok.service';

@Module({
  controllers: [TikTokAuthController],
  providers: [TiktokService]
})
export class TiktokModule {}
