import { Controller, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Auth } from 'entity/auth.entity';
import { AuthInput } from 'input/auth.input';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Payload() input: AuthInput): Promise<Auth> {
        return this.authService.login(input);
    }
}
