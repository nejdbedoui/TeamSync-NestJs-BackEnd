import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { User } from 'src/Schema/User.Schema';
import { UserRepository, UserService } from 'src/uses-case/User';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

 
@Injectable()
export class TwoFactorAuthenticationService {
   constructor (
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
  ) {}
 
  public async generateTwoFactorAuthenticationSecret(email: string , id: string) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
    await this.usersService.setTwoFactorAuthenticationSecret(secret, id);
    return {
      secret,
      otpauthUrl
    }
  }
  

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    console.log("otpauthUrl",otpauthUrl);
    
    return toFileStream(stream, otpauthUrl);
  }
  
  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, fasecret: string) {
    console.log("twoFactorAuthenticationCode:",twoFactorAuthenticationCode)
    console.log("fasecret:",fasecret)
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: fasecret
    })
  } 
}