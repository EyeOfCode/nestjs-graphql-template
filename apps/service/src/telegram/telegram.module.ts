import { forwardRef, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telegram } from 'entity/telegram.entity';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Telegram]),forwardRef(() => SendgridModule),
  JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>('app.JWT_SECRET_EMAIL'),
      }
    },
    inject: [ConfigService]
  })
],
  providers: [TelegramService],
  exports: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule {}
