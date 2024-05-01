import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { Documents, DocumentsSchema } from "../../Schema/Documents.Schema";
import { DocumentsController } from "../../Controllers/Documents.Controller";
import { Folder, FolderSchema } from 'src/Schema/Folder.Schema';
import { UserRepository } from '../User';
import { FolderRepository } from '../Folder/Folder-repo/folder.repository';
import { Content, ContentSchema } from 'src/Schema/Content';
import { ContentRepository } from './Content-Repo/content.repository';
import { ContentService } from './content.service';
import { ContentController } from 'src/Controllers/Content.controller';
import { WebsocketGateway } from './websocketGateway ';

@Module({
  imports:[    MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema },
    { name: User.name, schema: UserSchema },{ name: Content.name, schema: ContentSchema },{ name: Folder.name, schema: FolderSchema }])
  
  
  ],
  controllers: [ContentController],
  providers: [WebsocketGateway,ContentService,UserRepository,FolderRepository,
    ContentRepository, {
    provide: 'ContentRepositoryInterface',
    useClass: ContentRepository
  }],
  exports: [ContentService]
})
export class ContentModule {}
