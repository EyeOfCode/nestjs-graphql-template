import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { User } from 'entity/user.entity';
import { UserService } from './users.service';
import { UserInput, UserQuery, UserUpdate } from 'input/user.input';
import { Company } from 'entity/company.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(()=> User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async users(@Args('input') input: UserQuery): Promise<User[]> {
    return this.userService.find(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @ResolveField('company', () => Company, { nullable: true })
  async company(@Parent() user: User): Promise<Company | null> {
    const id = user.company?.id;
    return this.userService.getCompanyData(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUserById(
    @Args('input') input: UserUpdate,
    @Args('id') id: string,
  ): Promise<User> {
    return this.userService.updateById(input, id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async removeById(@Args('id') id: number): Promise<string> {
    const res = await this.userService.removeById(id);
    if (res) {
      return 'Success';
    }
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') input: UserInput,
    @Args('companyId') companyId: string,
  ): Promise<User> {
    return this.userService.create(input, companyId);
  }
}
