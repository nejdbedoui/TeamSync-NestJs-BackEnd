import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from "../../Controllers/Settings.controller";
import mongoose from "mongoose";
import { SettingsRepository } from "./Settings-repo/settings.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { Settings, SettingsSchema } from "../../Schema/Settings.Schema";

@Module({
  imports:[    MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService,SettingsRepository,
    {
      provide: "SettingsRepositoryInterface",      useClass: SettingsRepository
    }]
})
export class SettingsModule {}
