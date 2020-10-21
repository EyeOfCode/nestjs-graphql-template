import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthInput } from 'input/auth.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/users.service';
import { Auth } from 'entity/auth.entity';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => TelegramService))
        private readonly telegramService: TelegramService,

        private readonly jwtService: JwtService
      ) {}

      // async login(input: AuthInput): Promise<Auth> {
      //   const user = await this.userService.findEmail(input.email)
      //   if(!user){
      //     if(!user){
      //      throw new NotFoundException('email not found');
      //     }
      //   }

      //   const isPasswordMatch = await bcrypt.compare(input.password, user.password);
      //   if(!isPasswordMatch){
      //       throw new Error('password not math')
      //   }

      //   const accessToken = await this.jwtService.sign(
      //       {
      //         iss: "key", //key gateway
      //         sub: user.id,
      //         firstname: user.firstName,
      //         lastname: user.lastName
      //       }
      //     );
      //   return {token: accessToken}
      // }

      async login(input: AuthInput): Promise<Auth> {
        const user = await  this.telegramService.findEmail(input.email)
        if(!user){
          if(!user){
           throw new NotFoundException('email not found');
          }
        }

        const isPasswordMatch = await bcrypt.compare(input.password, user.password);
        if(!isPasswordMatch){
            throw new Error('password not math')
        }

        const accessToken = await this.jwtService.sign(
            {
              iss: "key", //key gateway
              sub: user.id,
              firstname: user.firs_name,
              lastname: user.last_name
            }
          );
        return {token: accessToken}
      }
}
