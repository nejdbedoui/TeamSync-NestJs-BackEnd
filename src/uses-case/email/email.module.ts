
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EmailService from './email.service';
import { MailController } from 'src/Controllers/mail.controller';
import { EmailConfirmationService } from '../Auth/EmailConfirmation/emailConfirmation.service';
import { UserModule } from '../User/user.module';
 
@Module({
  imports: [ConfigModule, UserModule],
  controllers: [MailController],
  providers: [EmailService,EmailConfirmationService],
  exports: [EmailService]
})
export class EmailModule {}