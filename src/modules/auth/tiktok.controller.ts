import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import axios from 'axios';
import qs from 'qs';

@Controller('auth/tiktok')
export class TikTokAuthController {

  // 🔹 Inicia login
  @Get()
  login(@Res() res: Response) {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const redirectUri = encodeURIComponent(process.env.TIKTOK_REDIRECT_URI);
    const state = Math.random().toString(36).substring(2);

    const authUrl =
      `https://www.tiktok.com/v2/auth/authorize/` +
      `?client_key=${clientKey}` +
      `&response_type=code` +
      `&scope=user.info.basic` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}`;

    return res.redirect(authUrl);
  }

  // 🔹 Callback
  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
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

console.log(JSON.stringify(tokenResponse.data, null, 2));

    const accessToken = tokenResponse.data?.data?.access_token;
    console.log(JSON.stringify(tokenResponse.data, null, 2));

      // Aqui você pode salvar no banco se quiser

      return res.send(`
        <html>
          <body style="font-family: Arial; text-align:center; margin-top:50px;">
            <h1>Login realizado com sucesso 🎉</h1>
            <p>Access Token:</p>
            <textarea rows="6" cols="60">${accessToken}</textarea>
          </body>
        </html>
      `);

    } catch (error) {
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