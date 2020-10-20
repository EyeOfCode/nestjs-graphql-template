import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { UserModule } from './user/users.module';
import { CompanyModule } from './company/companys.module';
import { MicroModule } from './micro/micro.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entity/user.entity';
import { Company } from 'entity/company.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
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
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    CompanyModule,
    MicroModule,
    AuthModule,
    ConfigModule,
  ],
  providers: [AppService],
})
export class AppModule {}
