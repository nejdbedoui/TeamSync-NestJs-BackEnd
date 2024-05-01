import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/uses-case/User/user.module';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { TwoFactorAuthenticationController } from 'src/Controllers/twoFactorAuthentication.controller';
import { AuthService } from '../auth.service';
import { SettingsModule } from 'src/uses-case/Settings/settings.module';



@Module({
  imports: [
    ConfigModule,
    UserModule,
    SettingsModule
      ],
  providers: [
    TwoFactorAuthenticationService,
    AuthService
  ],
  controllers: [TwoFactorAuthenticationController],
})
export class TwoFactorAuthenticationModule {}
