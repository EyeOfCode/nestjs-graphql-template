import { Controller, Get } from '@nestjs/common';
import { Company } from 'entity/company.entity';
import { CompanyService } from './companys.service';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ){}

    @Get()
    async company(): Promise<Company[]>{
        return this.companyService.find({})
    }
}
