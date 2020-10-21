import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entity/user.entity';
import { CompanyModule } from '../company/companys.module';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => CompanyModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
