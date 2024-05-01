import { Module } from "@nestjs/common";
import { FolderService } from "./folder.service";
import { FolderController } from "../../Controllers/Folder.controller";
import { Folder, FolderSchema } from "../../Schema/Folder.Schema";
import { FolderRepository } from "./Folder-repo/folder.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { SharedServiceModule } from "../../shared/shared-service/shared-service.module";
import { UserRepository } from "../User";

@Module({
  imports: [MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema },
    { name: User.name, schema: UserSchema }]),
    SharedServiceModule
  ],
  controllers: [FolderController],
  providers: [FolderService, FolderRepository,UserRepository,
    {
      provide: "FolderRepositoryInterface",
      useClass: FolderRepository
    }]
})
export class FolderModule {
}
