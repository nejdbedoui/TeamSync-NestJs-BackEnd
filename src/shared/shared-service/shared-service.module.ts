import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AuthService } from 'src/uses-case/Auth/auth.service';

@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedServiceModule {
}
