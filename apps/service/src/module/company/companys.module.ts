import { Module } from '@nestjs/common';
import { CompanyResolver } from './companys.resolver';
import { CompanyService } from './companys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
