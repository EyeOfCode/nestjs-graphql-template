import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Company } from 'entity/company.entity';
import { CompanyService } from './companys.service';
import { CompanyInput, CompanyQuery } from 'input/company.input';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async companies(@Args('input') input: CompanyQuery): Promise<Company[]> {
    return this.companyService.find(input);
  }

  @Query(() => Company)
  async company(@Args('id') id: number): Promise<Company> {
    return this.companyService.findById(id);
  }

  @Mutation(() => Company)
  async createCompany(@Args('input') input: CompanyInput): Promise<Company> {
    return this.companyService.create(input);
  }
}
