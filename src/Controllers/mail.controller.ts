
import { Public } from 'src/Custom Decorators/public.decorator';
import EmailService from 'src/uses-case/email/email.service';
import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from 'src/uses-case/Auth/auth.service';
import { LoginDto } from 'src/uses-case/User/DTO/Login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreatUserDto } from 'src/uses-case/User/DTO/CreatUser.dto';
import { EmailConfirmationService } from 'src/uses-case/Auth/EmailConfirmation/emailConfirmation.service';
import { UserService } from 'src/uses-case/User';
import ConfirmEmailDto from 'src/uses-case/Auth/EmailConfirmation/confirmEmail.dto';
import RequestWithUser from 'src/uses-case/Auth/requestWithUser.interface';

@Controller('p0?: { url: string; }p0: { url: string; }email')
export class MailController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly mailService: EmailService,
  ) { }


  @Public()
  @Post('send')
  async sendMail(
    @Body() sendMailDto: { email: string; subject: string },
  ): Promise<string> {
    await this.mailService.sendMail({
      ...sendMailDto,
    });

    return 'Email sent successfully';
  }

}