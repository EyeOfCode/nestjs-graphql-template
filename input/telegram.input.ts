import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNotEmptyObject } from 'class-validator';

@InputType()
export class TelegramUserInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @IsNotEmpty()
  firs_name: string

  @Field()
  @IsNotEmpty()
  last_name: string

  @Field({nullable: true})
  username?: string

  @Field()
  @IsNotEmpty()
  auth_date: number

  @Field()
  @IsNotEmpty()
  hash: string
}

@InputType()
export class TelegramInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmptyObject()
  user: TelegramUserInput

  @Field()
  @IsNotEmpty()
  password: string
}

