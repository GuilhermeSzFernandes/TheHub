import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { authPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() authPayload: authPayloadDto){
        const user = this.authService.validateUser(authPayload)
        if(!user)throw new HttpException('Invalid Credentials', 401)
        return user
    }

    @Post('create')
    create(@Body() body: Prisma.UserCreateInput){
        return this.authService.createUser(body)
    }
}
