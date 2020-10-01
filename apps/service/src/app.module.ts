import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { UserModule } from './module/user/users.module';
import { CompanyModule } from './module/company/companys.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entity/user.entity';
import { Company } from 'entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-ts',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Company],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true,
      playground: true,
    }),
    UserModule,
    CompanyModule,
  ],
  providers: [AppService],
})
export class AppModule {}
