import { Test, TestingModule } from '@nestjs/testing';
import { TikTokAuthController } from './tiktok-auth.controller';

describe('TikTokAuthController', () => {
  let controller: TikTokAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TikTokAuthController],
    }).compile();

    controller = module.get<TikTokAuthController>(TikTokAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
