import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailHistory } from 'entity/email-history';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailHistory]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('app.JWT_SECRET_EMAIL'),
          signOptions: { expiresIn: '1d' },
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [SendgridService],
  exports: [SendgridService]
})
export class SendgridModule {}
