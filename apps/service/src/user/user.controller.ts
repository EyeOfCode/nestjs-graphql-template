import { ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'entity/user.entity';
import { UserInput } from 'input/user.input';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async find(): Promise<User[]>{
        const user = await this.userService.find({});
        return user.map(data => new User({
            ...data
        }))
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post(':id')
    async register(@Payload() input: UserInput, @Param() companyId): Promise<User>{
        const {id} = companyId
        const user = await this.userService.create(input,id)
        return new User({
            ...user
        })
    }
}
