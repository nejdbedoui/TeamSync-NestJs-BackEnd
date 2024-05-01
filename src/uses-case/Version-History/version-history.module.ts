import { Module } from '@nestjs/common';
import { VersionHistoryService } from './version-history.service';
import { VersionHistoryController } from "../../Controllers/VersionHistory.controller";
import { VersionHistoryRepository } from "./Version-History-repo/VersionHistory.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { VersionHistory, VersionHistorySchema } from "../../Schema/VersionHistory.Schema";

@Module({
  imports:[    MongooseModule.forFeature([{ name: VersionHistory.name, schema: VersionHistorySchema }]),
  ],
  controllers: [VersionHistoryController],
  providers: [VersionHistoryService,VersionHistoryRepository,
    {
      provide: "VersionHistoryRepositoryInterface",      useClass: VersionHistoryRepository
    }]
})
export class VersionHistoryModule {}
