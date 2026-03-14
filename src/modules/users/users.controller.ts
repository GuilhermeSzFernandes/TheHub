import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService){}

    @Get(":id")
    async getUser(@Param("id") id: string){
        return this.service.user({id})
    }
    
    @Post()
    createUser(@Body() userData: { name?: string; email: string }){
        // return this.service.createUser(userData)
    }
}
