/* import { Module } from '@nestjs/common';
import { AuthService } from './forgot-password';
import { AuthController } from './forgot-password.controller';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports:[
    JwtModule, 
    PassportModule,
    ],
  controllers: [AuthController],
  providers: [AuthService, UsersModule, UsersService]
})
export class AuthModule {} */