import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client'

@Injectable()
export class TiktokAuthService {
    constructor(private prisma: PrismaService){}

    async saveToken(data: Prisma.SocialIntegrationCreateInput){
        return this.prisma.socialIntegration.create({data});
    }
}
