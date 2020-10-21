import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class TelegramUserInput {
  @Field(() => ID)
  id: string

  @Field()
  firs_name: string

  @Field()
  last_name: string

  @Field()
  username: string

  @Field()
  auth_date: number

  @Field()
  hash: string
}

@InputType()
export class TelegramInput {
  @Field()
  email: string;

  @Field()
  user: TelegramUserInput

  @Field()
  password: string
}
