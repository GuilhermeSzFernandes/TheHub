import { Injectable } from '@nestjs/common';
import { authPayloadDto } from './dto/auth.dto';
import { PrismaService } from '../../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { AppError } from '../../common/errors/appError';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){} 

    async validateUser({email, password}: authPayloadDto){
        const findUser = await this.prisma.user.findUnique({where: {email}})
        if(!findUser) throw new AppError("Usuario não encontrado", 404);

        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch) throw new AppError("Senha invalida", 401);

        const payload = {
            id: findUser.id,
            email: findUser.email,
        };
        return this.jwtService.sign(payload);
    }

    async createUser(data: Prisma.UserCreateInput): Promise<any>{        
        try{
            data.password = await bcrypt.hash(data.password, 10);
            const body = await this.prisma.user.create({data,});
            const {password, role, ...res} = body
            return res;
        }
        catch(e){
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError("Email já cadastrado", 409)
            }
        }   
        
    }
}
