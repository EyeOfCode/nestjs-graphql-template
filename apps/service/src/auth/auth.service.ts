import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthInput } from 'input/auth.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/users.service';
import { Auth } from 'entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        private readonly jwtService: JwtService
      ) {}

      async login(input: AuthInput): Promise<Auth> {
        const user = await this.userService.findEmail(input.email)
        if(!user){
           throw new Error('email not found');
        }

        const isPasswordMatch = await bcrypt.compare(input.password, user.password);
        if(!isPasswordMatch){
            throw new Error('password not math')
        }

        const accessToken = await this.jwtService.sign(
            {
              iss: "key", //key gateway
              sub: user.id,
              firstname: user.firstName,
              lastname: user.lastName
            }
          );
        return {token: accessToken}
      }
}
