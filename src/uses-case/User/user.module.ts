import { Module } from '@nestjs/common';
import { UserService } from "./user.service";
import { UsersController } from "../../Controllers/user.controller";
import { UserRepository } from "./UserRepo/user.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.Schema';
import { Settings, SettingsSchema } from "../../Schema/Settings.Schema";
import { EmailConfirmationService } from '../Auth/EmailConfirmation/emailConfirmation.service';
import EmailService from '../email/email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({

  imports:[    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }
    ,{name:Settings.name,schema:SettingsSchema}]),
    

  ],
  controllers: [UsersController],

  providers: [
    UserService,
    UserRepository,
    EmailService,
    ConfigModule,
    ConfigService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository
    }
  ],
  exports: [UserService]

})
export class UserModule {}