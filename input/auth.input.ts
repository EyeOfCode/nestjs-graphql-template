import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from './validator/match.decorator';

@InputType()
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string
}

@InputType()
export class VerifyEmailInput {
  @Field()
  @IsNotEmpty()
  token: string
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string

  @Field()
  @Match('password', {message: "password not match"})
  confirm_password: string
}
