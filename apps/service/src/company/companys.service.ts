import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Company } from 'entity/company.entity';
import { CompanyInput, CompanyQuery } from 'input/company.input';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async find(input: CompanyQuery): Promise<Company[]> {
    return this.companyRepository.find({
      where: [
        { name: Like(`%${input.search || ''}%`) },
      ],
      order: { name: 'ASC' },
      skip: input.skip || 0,
      take: input.take || 10,
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<Company> {
    const res = await this.companyRepository.findOne(id);
    if (!res) {
      throw new Error('user not found');
    }
    return res;
  }

  async updateById(input: CompanyInput, id: string): Promise<Company> {
    const res = await this.companyRepository.findOne(id);
    if (!res) {
      throw new Error('user not found');
    }
    const data = this.companyRepository.create(input);
    return this.companyRepository.save({ ...data, id });
  }

  async removeById(id: number): Promise<Company> {
    const res = await this.companyRepository.findOne(id);
    if (!res) {
      throw new Error('user not found');
    }
    await this.companyRepository.delete(id);
    return res;
  }

  async create(input: CompanyInput): Promise<Company> {
    const company = this.companyRepository.create(input);
    return this.companyRepository.save(company);
  }
}
