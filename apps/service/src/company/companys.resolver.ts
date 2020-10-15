import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Company } from 'entity/company.entity';
import { CompanyService } from './companys.service';
import { CompanyInput, CompanyQuery } from 'input/company.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Company])
  async companies(@Args('input') input: CompanyQuery): Promise<Company[]> {
    return this.companyService.find(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Company)
  async company(@Args('id') id: string): Promise<Company> {
    return this.companyService.findById(id);
  }

  @Mutation(() => Company)
  async createCompany(@Args('input') input: CompanyInput): Promise<Company> {
    return this.companyService.create(input);
  }
}
