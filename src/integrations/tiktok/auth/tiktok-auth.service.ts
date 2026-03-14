import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client'

@Injectable()
export class TiktokAuthService {
    constructor(private prisma: PrismaService){}

    async saveToken(data: Prisma.SocialIntegrationCreateInput){
        return await this.prisma.socialIntegration.create({data});
    }
}
