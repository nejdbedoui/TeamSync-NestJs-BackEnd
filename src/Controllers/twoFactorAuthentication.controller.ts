import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  HttpCode,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.service';
import { Response } from 'express';
import RequestWithUser from 'src/uses-case/Auth/requestWithUser.interface';
import { Public } from 'src/Custom Decorators/public.decorator';
import { UserService } from 'src/uses-case/User/user.service';
import TwoFactorAuthenticationCodeDto from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentificationCode.dto';
import { AuthService } from 'src/uses-case/Auth/auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UserService,
    private readonly authService: AuthService
  ) { }

  @Public()
  @Post('generate')
  async register(@Res() response: Response, @Body() requestBody: { email: string, id: string }){
    const { email, id } = requestBody;
    const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(email, id);
    response.setHeader("content-type", "image/png");
      return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
  }


  @Public()
  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
    @Body('fasecret') fasecret: string,
  ): Promise<{ isAuthenticated: boolean }> {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, fasecret
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return { isAuthenticated: true };
  }

  @Public()
  @Post('turn-on-off')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @Body() requestBody: { id: string }
  ): Promise<boolean> {
    const { id } = requestBody;
    // Call the service method to toggle the authentication status
    return this.usersService.turnOnTwoFactorAuthentication(id);
  }
  
}