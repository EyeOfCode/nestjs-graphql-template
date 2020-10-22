import { ClassSerializerInterceptor, Controller, Get, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Telegram } from 'entity/telegram.entity';
import { ChangePasswordInput, ForgotPasswordInput, VerifyEmailInput } from 'input/auth.input';
import { TelegramInput } from 'input/telegram.input';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
    constructor(
        private readonly telegramService: TelegramService,
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async find(): Promise<Telegram[]>{
        return this.telegramService.find()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async create(@Payload() input: TelegramInput): Promise<Telegram>{
        return this.telegramService.create(input)
    }

    @Post('/forgotpassword')
    async forgotPassword(@Payload() input: ForgotPasswordInput): Promise<string>{
       return this.telegramService.forgotPassword(input)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/verifypassword')
    async verifyPassword(@Payload() input: VerifyEmailInput): Promise<Telegram>{
       return this.telegramService.validatorEmail(input)
    }

    @Put('/changepassword')
    async changePassword(@Payload() input: ChangePasswordInput): Promise<string>{
       return this.telegramService.changePassword(input)
    }
}
