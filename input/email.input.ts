import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SendGridInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  id: string

  @Field()
  @IsNotEmpty()
  type: string
}
