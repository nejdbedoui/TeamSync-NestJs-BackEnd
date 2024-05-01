import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../User/user.module';
import { AuthController } from 'src/Controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { EmailConfirmationService } from './EmailConfirmation/emailConfirmation.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EmailModule } from '../email/email.module';
import { SettingsModule } from '../Settings/settings.module';


@Module({
  imports:
    [
      UserModule,
      PassportModule,
      EmailModule,
      SettingsModule,
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1d' },
      }),
      ConfigModule.forRoot({
        validationSchema: Joi.object({
          JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
          JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
          EMAIL_CONFIRMATION_URL: Joi.string().required(),
          // ...
        })
      }),
    ],
  providers:
    [
      {
        provide: APP_GUARD,
        useClass: AuthGuard,
      },
      AuthService,
      EmailConfirmationService,

    ],
  controllers:
    [
      AuthController
    ]
})
export class AuthModule { }
