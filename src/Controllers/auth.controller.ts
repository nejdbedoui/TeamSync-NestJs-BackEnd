import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from 'src/uses-case/Auth/auth.service';
import { LoginDto } from 'src/uses-case/User/DTO/Login.dto';
import { Public } from 'src/Custom Decorators/public.decorator';
import { CreatUserDto } from 'src/uses-case/User/DTO/CreatUser.dto';
import { EmailConfirmationService } from 'src/uses-case/Auth/EmailConfirmation/emailConfirmation.service';
import { UserService } from 'src/uses-case/User';


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {


  constructor(
    private authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService, 
    private readonly userservice: UserService,
    ) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);

  }
  
  @Public()
  @Post('register')
  async register(@Body() registrationData: CreatUserDto) {
    const user = await this.userservice.CreatUser(registrationData);
    await this.emailConfirmationService.sendVerificationLink(registrationData.email);
    return user;
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.userservice.sendPasswordResetEmail(email);
    return { message: 'Password reset email sent' };
  }

  
}
