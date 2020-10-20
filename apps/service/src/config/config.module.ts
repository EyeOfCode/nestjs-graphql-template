import { Module } from '@nestjs/common';
import { ConfigModule as ConfigEnv } from '@nestjs/config';
import { ConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigEnv.forRoot({
      load: [configuration],
      isGlobal: true
    })
  ],
  providers: [ConfigService]
})
export class ConfigModule {}
