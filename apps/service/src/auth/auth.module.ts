import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('app.JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }
      },
      inject: [ConfigService]
    }),
    forwardRef(() => UserModule),
    forwardRef(() => TelegramModule)
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
