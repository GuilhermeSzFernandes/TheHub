import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service.js';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>{
        return this.prisma.user.findUnique({where: userWhereUniqueInput,})
    }

    // async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //     try{
    //         return this.prisma.user.create({})
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({where,})
    }
}
