import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from 'entity/auth.entity';
import { AuthInput } from 'input/auth.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => Auth)
    async login(
        @Args('input') input: AuthInput,
    ): Promise<Auth> {
        return this.authService.login(input);
    }
}
