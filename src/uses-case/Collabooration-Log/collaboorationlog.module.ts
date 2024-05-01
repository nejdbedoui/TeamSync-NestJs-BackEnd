import { Module } from "@nestjs/common";
import { CollaborationlogService } from "./collaborationlog.service";
import { CollaboorationLogController } from "../../Controllers/CollaboorationLog.controller";
import { CollabLogRepository } from "./Collaboration-Log-Repo/CollabLog.repository";
import { CollabLogRepositoryInterface } from "./Collaboration-Log-Repo/CollabLog.repository.interface";
import { MongooseModule } from "@nestjs/mongoose";
import { CollaboorationLog, CollaboorationLogSchema } from "../../Schema/CollaboorationLog.Schema";

@Module({

  imports: [MongooseModule.forFeature([{ name: CollaboorationLog.name, schema: CollaboorationLogSchema }])],
  controllers: [CollaboorationLogController],

  providers: [
    CollaborationlogService,
    CollabLogRepository,
    {
      provide: "CollabLogRepositoryInterface",
      useClass: CollabLogRepository

    }


  ]
})
export class CollaboorationlogModule {
}
