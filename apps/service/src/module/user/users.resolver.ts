import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from 'entity/user.entity';
import { UserService } from './users.service';
import { UserInput, UserQuery, UserUpdate } from 'input/user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args('input') input: UserQuery): Promise<User[]> {
    return this.userService.find(input);
  }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async updateUserById(
    @Args('input') input: UserUpdate,
    @Args('id') id: number,
  ): Promise<User> {
    return this.userService.updateById(input, id);
  }

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
    @Args('companyId') companyId: number,
  ): Promise<User> {
    return this.userService.create(input, companyId);
  }
}
