import { Module } from '@nestjs/common';

import { EmailConfirmationService } from './emailConfirmation.service';
import { EmailConfirmationController } from 'src/Controllers/emailConfirmation.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/uses-case/User/user.module';
import EmailService from 'src/uses-case/email/email.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, EmailService],
})
export class EmailConfirmationModule {}
