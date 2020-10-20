import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string

  @IsNotEmpty()
  @Field({ nullable: true })
  firstName?: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  lastName?: string;
}

@InputType()
export class UserQuery {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;
}

@InputType()
export class UserUpdate {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  isActive?: boolean;
}
