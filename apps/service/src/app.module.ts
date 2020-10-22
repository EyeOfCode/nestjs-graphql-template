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
import { TelegramModule } from './telegram/telegram.module';
import { Telegram } from 'entity/telegram.entity';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { EmailHistory } from 'entity/email-history';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Company, Telegram, EmailHistory],
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
    TelegramModule,
    SendgridModule,
  ],
  providers: [AppService],
})
export class AppModule {}
