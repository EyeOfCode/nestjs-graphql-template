import { Module } from '@nestjs/common';
import { CompanyResolver } from './companys.resolver';
import { CompanyService } from './companys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'entity/company.entity';
import { CompanyController } from './company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
