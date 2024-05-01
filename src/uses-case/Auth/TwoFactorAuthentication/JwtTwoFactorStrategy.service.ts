
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {TokenPayload} from '../tokenPayload.interface';
import { UserService } from 'src/uses-case/User';
 
@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(
  Strategy,
  'jwt-two-factor'
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
    const user = await this.userService.findOneUser(payload.userId.toString());
    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (payload.isSecondFactorAuthenticated) {
      return user;
    }
  }
} 