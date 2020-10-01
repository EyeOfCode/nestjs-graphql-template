import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CompanyInput {
  @Field({ nullable: false })
  name: string;
}

@InputType()
export class CompanyQuery {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  take?: number;
}
