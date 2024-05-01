import { Module } from "@nestjs/common";
import { SharedAssetsService } from "./shared-assets.service";
import { SharedAssetsController } from "../../Controllers/SharedAssets.controller";
import { SharedAssetsRepository } from "./Shared-Assets-Repo/SharedAssets.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedAssets, SharedAssetsSchema } from "../../Schema/SharedAssets.Schema";
import { Documents, DocumentsSchema } from "../../Schema/Documents.Schema";
import { Folder, FolderSchema } from "../../Schema/Folder.Schema";
import { User, UserSchema } from "../../Schema/User.Schema";
import {FolderRepository} from "../Folder/Folder-repo/folder.repository";
import {DocumentRepository} from "../Documents/Document-Repo/document.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: SharedAssets.name, schema: SharedAssetsSchema }

  ,{ name: Documents.name, schema: DocumentsSchema },
    { name: Folder.name, schema: FolderSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [SharedAssetsController],
  providers: [SharedAssetsService, SharedAssetsRepository,FolderRepository,
    DocumentRepository,
    {
      provide: "SharedAssetsRepositoryInterface",
      useClass: SharedAssetsRepository
    }]
})
export class SharedAssetsModule {
}
