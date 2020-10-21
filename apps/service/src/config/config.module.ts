import { Module } from '@nestjs/common';
import { ConfigModule as ConfigEnv } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigEnv.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [configuration],
    })
  ],
})
export class ConfigModule {}
