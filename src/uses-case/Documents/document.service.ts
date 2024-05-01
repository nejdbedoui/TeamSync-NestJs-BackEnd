
import { HttpException, Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import mongoose, { Model, Types } from "mongoose";
import { Documents } from "../../Schema/Documents.Schema";
import { Folder } from 'src/Schema/Folder.Schema';
import { UserRepository } from '../User';
import { FolderRepository } from '../Folder/Folder-repo/folder.repository';
import { SimpleDocDto } from './DTO/SimpleDoc.dto';
import { ContentService } from '../Content/content.service';
import { SimpleFolderDto } from '../Folder/DTO/SimpleFolder.dto';
import { SharedService } from 'src/shared/shared-service/shared.service';
import { ObjectId } from 'mongodb';


@Injectable()
export class DocumentService {


    constructor(
        private documentRepository: DocumentRepository,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Documents.name) private Documentmodel: Model<Documents>,
        private sharedService: SharedService,
        @InjectModel(Folder.name) private folderModel: Model<Folder>,
        private userrepo: UserRepository,
        private folderrepo: FolderRepository,
        private contentService: ContentService,
    ) { }





    async addDocument(document: Documents) {
        document._id = new ObjectId();
        if (document.parentfolder != null) {
            if (Types.ObjectId.isValid(document.parentfolder.toString())) {
                document.parentfolder = new Types.ObjectId(document.parentfolder).toString();
            } else {
                let folder = new this.folderModel();
                folder.foldername = document.parentfolder
                folder.createdby = document.createdby
                const newfolder = await folder.save()
                document.parentfolder = newfolder._id
            }
        }
        document.createdby = new Types.ObjectId(document.createdby).toString()
        const createdoc = this.documentRepository.create(document)
        return createdoc;
    }

    getOne(id: string) {
        return this.documentRepository.findById(id);
    }

    delete(id: string) {
        return this.documentRepository.delete(id);
    }

    update(document: Documents) {
        return this.documentRepository.update(document._id, document);
    }

    getAll() {
        return this.documentRepository.findAll()
    }

    async getAllby(parentId: string, name: string, createdBy: string, createdDate: Date, sortupdated: string, lastUpdate: Date, page: number = 1, limit: number = 10) {
        const query: any = {};
        if (parentId && Types.ObjectId.isValid(parentId)) {
            query.parentfolder = new Types.ObjectId(parentId);
        } else if (name != "") {
            query.parentfolder = null;
        }
        if (createdBy && Types.ObjectId.isValid(createdBy)) {
            query.createdby = new Types.ObjectId(createdBy);
        }
        if (createdDate) {
            query.createat = { $gte: createdDate };
        }
        if (lastUpdate) {
            query.Updateat = { $lte: lastUpdate };
        }
        if (name) {
            query.title = { $regex: `^${name}`, $options: 'i' };
        }
        try {
            const result = await this.documentRepository.findAllWithPagination(query, sortupdated, page, limit);
            const totaldata = result.totaldata;
            const totalPages = Math.ceil(totaldata / limit);
            const data: SimpleDocDto[] = result.data.map((document: any) => {
                const simpleDocDto: SimpleDocDto = new SimpleDocDto();
                simpleDocDto.id = document.id;
                simpleDocDto.title = document.title;
                simpleDocDto.createdby = document.createdby;
                simpleDocDto.createdat = document.createat;
                simpleDocDto.updatedat = document.Updateat;
                return simpleDocDto;
            });
            return {
                data,
                currentPage: page,
                totalPages,
                totaldata
            };
        } catch (error) {
            throw new Error(`Error retrieving documents: ${error}`);
        }
    }


    async getAllDocAndFolderby(parentId: string, name: string, createdBy: string, sortupdated: string, createdDate: Date, lastUpdate: Date, page: number = 1, limit: number = 10) {
        const query: any = {};
        limit = limit / 2
        if (parentId && Types.ObjectId.isValid(parentId)) {
            query.parentfolder = new Types.ObjectId(parentId);
        } else if (!name) {
            query.parentfolder = null;
        }
        if (createdBy && Types.ObjectId.isValid(createdBy)) {
            query.createdby = new Types.ObjectId(createdBy);
        }
        if (createdDate) {
            query.createat = { $gte: createdDate };
        }
        if (lastUpdate) {
            query.Updateat = { $lte: lastUpdate };
        }
        if (name) {
            query.foldername = { $regex: `^${name}`, $options: 'i' };
        }

        let folderResult = await this.folderrepo.findAllWithPagination(query, sortupdated, page, limit);
        const data: SimpleDocDto[] = folderResult.data.map((folder: any) => {
            const simplefolderDto: SimpleDocDto = new SimpleDocDto();
            simplefolderDto.id = folder.id;
            simplefolderDto.title = folder.foldername;
            simplefolderDto.createdby = folder.createdby;
            simplefolderDto.createdat = folder.createdat;
            simplefolderDto.updatedat = folder.Updateat;
            simplefolderDto.type = "folder"
            return simplefolderDto;
        });
        if (name) {
            query.title = { $regex: `^${name}`, $options: 'i' };
            query.foldername = null
        }
        try {
            let result = await this.documentRepository.findAllWithPagination(query, sortupdated, page, limit);
            const totaldata = result.totaldata + folderResult.totaldata;

            let totalPages = Math.ceil((totaldata) / limit * 2);
            if (folderResult.data.length == 0) {
                totalPages = Math.ceil((totaldata) / limit);
            }

            if (result.data.length == 0) {
                totalPages = Math.ceil((totaldata) / limit);
            }

            result.data.map((document: any) => {
                const simpleDocDto: SimpleDocDto = new SimpleDocDto();
                simpleDocDto.id = document.id;
                simpleDocDto.title = document.title;
                simpleDocDto.createdby = document.createdby;
                simpleDocDto.createdat = document.createat;
                simpleDocDto.updatedat = document.Updateat;
                data.push(simpleDocDto)
                return simpleDocDto;
            });
            return {
                data,
                currentPage: page,
                totalPages,
                totaldata
            };
        } catch (error) {
            throw new Error(`Error retrieving documents: ${error}`);
        }
    }

    Deltealldocs(ids: string[]) {
        return Promise.all(ids.map(async (id) => {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('invalide ID', 400);
            this.documentRepository.delete(id)
        }));
    }

   
    async addDocumentWithContent(newId: string, cloneId: string) {
        try {

          if (!newId) {
            throw new Error('newId cannot be empty');
          }
          const cloneDoc = await this.contentService.getAllByDoc(cloneId);
          if (!cloneDoc || cloneDoc.length === 0) {
            throw new Error('No content found for the provided cloneId');
          }
          const objectId = new Types.ObjectId(newId);
          const clonedContents = await Promise.all(cloneDoc.map(async contentItem => {
            const clonedContent = { ...contentItem.toObject(), _id: new Types.ObjectId(), documentid: objectId };
            return this.contentService.addContent(clonedContent);
          }));

          return clonedContents;
        } catch (error) {
          console.error('Error adding document with content:', error);
          throw error;
        }
      }
      
      
}