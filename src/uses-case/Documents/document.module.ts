import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { Documents, DocumentsSchema } from "../../Schema/Documents.Schema";
import { DocumentRepository } from './Document-Repo/document.repository';
import { DocumentsController } from "../../Controllers/Documents.Controller";
import { SharedServiceModule } from 'src/shared/shared-service/shared-service.module';
import { Folder, FolderSchema } from 'src/Schema/Folder.Schema';
import { UserRepository } from '../User';
import { FolderRepository } from '../Folder/Folder-repo/folder.repository';
import { Content, ContentSchema } from 'src/Schema/Content';
import { ContentRepository } from '../Content/Content-Repo/content.repository';
import { ContentService } from '../Content/content.service';

@Module({
  imports:[    MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema },
    { name: User.name, schema: UserSchema },{ name: Folder.name, schema: FolderSchema },{ name: Content.name, schema: ContentSchema }]),
  SharedServiceModule
  
  
  ],
  controllers: [DocumentsController],
  providers: [DocumentService,UserRepository,FolderRepository,ContentRepository,ContentService,
   DocumentRepository, {

    provide: 'DocumentRepositoryInterface',
    useClass: DocumentRepository
  }]
})
export class DocumentModule {}
