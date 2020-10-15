import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from 'entity/user.entity';
import { UserInput, UserQuery, UserUpdate } from 'input/user.input';
import { CompanyService } from '../company/companys.service';
import * as bcrypt from 'bcryptjs';
import { Company } from 'entity/company.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async findEmail(email: string): Promise<User>{
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailExpression.test(
      String(email).toLowerCase(),
    );
    if (!isValidEmail) {
      throw new Error('email not in proper format');
    }
    return this.usersRepository.findOne({ email });
  }

  async getCompanyData(id: string): Promise<Company | null> {
    const company = await this.companyService.findById(id);
    return company || null;
  }

  async find(input: UserQuery): Promise<User[]> {
    return this.usersRepository.find({
      where: [
        { firstName: Like(`%${input.search || ''}%`) },
        { lastName: Like(`%${input.search || ''}%`) },
      ],
      order: { firstName: 'ASC' },
      skip: input.skip || 0,
      take: input.take || 10,
      relations: ['company'],
    });
  }

  async findById(id: number): Promise<User> {
    const res = await this.usersRepository.findOne(id, {
      relations: ['company'],
    });
    if (!res) {
      throw new Error('user not found');
    }
    return res;
  }

  async updateById(input: UserUpdate, id: string): Promise<User> {
    const res = await this.usersRepository.findOne(id);
    if (!res) {
      throw new Error('user not found');
    }
    const data = this.usersRepository.create(input);
    return this.usersRepository.save({ ...data, id });
  }

  async removeById(id: number): Promise<User> {
    const res = await this.usersRepository.findOne(id);
    if (!res) {
      throw new Error('user not found');
    }
    await this.usersRepository.delete(id);
    return res;
  }

  async create(input: UserInput, companyId: string): Promise<User> {
    const company = await this.companyService.findById(companyId);
    if (company) {
      const user = this.usersRepository.create(input);
      user.company = company;
      await this.findEmail(input.email)
      user.password = await bcrypt.hashSync(user.password,10);
      return this.usersRepository.save(user);
    }
    throw new Error('user not found');
  }
}
