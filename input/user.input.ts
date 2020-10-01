import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  isActive: boolean;
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
