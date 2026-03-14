import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import { TiktokAuthService } from './tiktok-auth.service';
import { Prisma, SocialPlatform } from '@prisma/client';

@Controller('auth/tiktok')
export class TikTokAuthController {

  constructor(private service: TiktokAuthService){}

    // Inicia login
    @Get()
    login(@Res() res: Response) {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const redirectUri = process.env.TIKTOK_REDIRECT_URI;
    const state = Math.random().toString(36).substring(2);

    const authUrl =
            `https://www.tiktok.com/v2/auth/authorize/` +
            `?client_key=${clientKey}` +
            `&response_type=code` +
            `&scope=user.info.basic,video.upload,video.publish` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&state=${state}`;

        return res.redirect(authUrl);
    }

  // Callback
  @Get('callback')
  async callback(@Query('code') code: string, @Query('state') state: string, @Res() res: Response, ) {
    try {
      const tokenResponse = await axios.post(
        'https://open.tiktokapis.com/v2/oauth/token/',
        qs.stringify({
          client_key: process.env.TIKTOK_CLIENT_KEY,
          client_secret: process.env.TIKTOK_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.TIKTOK_REDIRECT_URI,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const data: Prisma.SocialIntegrationCreateInput = {
        accessToken: tokenResponse.data.access_token,
        accountId: tokenResponse.data.open_id,
        expiresAt: new Date(Date.now() + tokenResponse.data.expires_in * 1000),
        refreshToken: tokenResponse.data.refresh_token,
        platform: SocialPlatform.TIKTOK,
        
        user: {
          connect: {id: "e26c54a9-3de8-43b9-bf6b-61e938f1daad"}
        }
      };

      await this.service.saveToken(data)

      return res.send(`
        <html>
          <body style="font-family: Arial; text-align:center; margin-top:50px;">
            <h1>Sucesso ao salvar token ✅</h1>
          </body>
        </html>
      `);
    } 
    catch (error) {
      console.error(error.response?.data || error.message);

      return res.send(`
        <html>
          <body style="font-family: Arial; text-align:center; margin-top:50px;">
            <h1>Erro ao autenticar ❌</h1>
            <pre>${JSON.stringify(error.response?.data, null, 2)}</pre>
          </body>
        </html>
      `);
    }
  }
}