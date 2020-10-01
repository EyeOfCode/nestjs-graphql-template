import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entity/user.entity';
import { CompanyModule } from '../company/companys.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CompanyModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
