import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SharedAssetsRepository } from "./Shared-Assets-Repo/SharedAssets.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import {Model, Types} from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { Documents } from "../../Schema/Documents.Schema";
import { SharedAssets } from "../../Schema/SharedAssets.Schema";
import { createSharedDto } from "./DTO/CreateShared.dto";
import { AccesLevel } from "src/Schema/Enum/AccesLevel";
import { findSharedDto } from "./DTO/findSharedAssets.dto";
import { updateSharedDto } from "./DTO/updateShared.dto";
import {SimpleDocDto} from "../Documents/DTO/SimpleDoc.dto";
import {FolderRepository} from "../Folder/Folder-repo/folder.repository";
import {DocumentRepository} from "../Documents/Document-Repo/document.repository";

@Injectable()
export class SharedAssetsService {

  constructor(private SharedAssetsRepository: SharedAssetsRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private folderModel: Model<Folder>,
              @InjectModel(Documents.name) private documentModel: Model<Documents>,
              @InjectModel(SharedAssets.name) private sharedModel: Model<SharedAssets>,
              private FolderRepository: FolderRepository,
              private DocumentRepo: DocumentRepository
  ) {
  }


  async createSharedAssets(creatshareddto: createSharedDto) {
    if (!creatshareddto.Userid || creatshareddto.Userid.length === 0) {
      throw new HttpException("At least one User ID is required", HttpStatus.BAD_REQUEST);
    }

    if (creatshareddto.foldID) {
      const folder = await this.folderModel.findById(creatshareddto.foldID);
      if (!folder) {
        throw new HttpException("Folder not found with provided ID", HttpStatus.NOT_FOUND);
      }
    } else if (creatshareddto.docID) {
      const document = await this.documentModel.findById(creatshareddto.docID);
      if (!document) {
        throw new HttpException("Document not found with provided ID", HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException("Either Folder ID or Document ID is required", HttpStatus.BAD_REQUEST);
    }

    const sharedAssetsList = [];


    if (creatshareddto.docID) {
      const doc = await this.folderModel.findById(creatshareddto.foldID);
      for (const userId of creatshareddto.Userid) {
        const userIdString = userId.toString(); // Convertir l'ID utilisateur en chaîne de caractères
        const sharedAssets = new this.sharedModel({
          docid: creatshareddto.docID,
          userid: userIdString,
          acceslevel: creatshareddto.acceslevel
        });
        sharedAssetsList.push(await sharedAssets.save());
      }

    }


    if (creatshareddto.foldID) {
      const folder = await this.folderModel.findById(creatshareddto.foldID);
      for (const userId of creatshareddto.Userid) {
        const userIdString = userId.toString(); // Convertir l'ID utilisateur en chaîne de caractères
        const sharedAssets = new this.sharedModel({
          folderid: creatshareddto.foldID,
          userid: userIdString,
          acceslevel: creatshareddto.acceslevel
        });
        sharedAssetsList.push(await sharedAssets.save());
      }
      await this.createSharedAssetsForSubfolders(folder, creatshareddto.Userid, creatshareddto.acceslevel);
    } else if (creatshareddto.docID) {
      for (const userId of creatshareddto.Userid) {
        const userIdString = userId.toString(); // Convertir l'ID utilisateur en chaîne de caractères
        const sharedAssets = new this.sharedModel({
          docid: creatshareddto.docID,
          userid: userIdString,
          acceslevel: creatshareddto.acceslevel
        });
        sharedAssetsList.push(await sharedAssets.save());
      }
    }

    return sharedAssetsList;
  }



  // Fonction récursive pour créer des SharedAssets pour les sous-dossiers
  private async createSharedAssetsForSubfolders(folder: Folder, userIds: string[], accessLevel: AccesLevel) {
    const subfolders = await this.folderModel.find({ parentfolder: folder._id });
    for (const subfolder of subfolders) {
      for (const userId of userIds) {
        const sharedAssetsFolder = new this.sharedModel({
          folderid: subfolder._id,
          userid: userId,
          acceslevel: accessLevel
        });
        await sharedAssetsFolder.save();
      }

      // Créer un SharedAssets pour chaque document dans le sous-dossier
      const documents = await this.documentModel.find({ parentfolder: subfolder._id });
      for (const document of documents) {
        for (const userId of userIds) {
          const sharedAssetsDocument = new this.sharedModel({
            docid: document._id,
            userid: userId,
            acceslevel: accessLevel
          });
          await sharedAssetsDocument.save();
        }
      }

      // Appeler récursivement la fonction pour les sous-sous-dossiers
      await this.createSharedAssetsForSubfolders(subfolder, userIds, accessLevel);
    }
  }


  async findFolderSharedAssets(findSharedAssetsDto: findSharedDto) {
    if (findSharedAssetsDto.docID && findSharedAssetsDto.foldID) {
      return new HttpException("You can only find shared assets for one folder or one document", HttpStatus.BAD_REQUEST);
    }
    if (findSharedAssetsDto.docID) {
      const sharedAssets = await this.sharedModel.find({ docid: findSharedAssetsDto.docID, userid: findSharedAssetsDto.Userid });
      if (sharedAssets.length === 0) {
        throw new HttpException("No shared assets found for this document", HttpStatus.NOT_FOUND);
      }
      return sharedAssets;
    } else if (findSharedAssetsDto.foldID) {
      const sharedAssets = await this.sharedModel.find({ folderid: findSharedAssetsDto.foldID, userid: findSharedAssetsDto.Userid });
      if (sharedAssets.length === 0) {
        throw new HttpException("No shared assets found for this folder", HttpStatus.NOT_FOUND);
      }
      return sharedAssets;
    } else {
      throw new HttpException("You must provide either a document ID or a folder ID", HttpStatus.BAD_REQUEST);
    }





  }



  updateSharedAssets(updateSharedDto: updateSharedDto) {

  }

  async findSharedAssetsByUser({ Userid }: findSharedDto) {
    const sharedAssets = await this.sharedModel.find({ userid: Userid }).exec();


    const sharedFolderIds = sharedAssets
      .filter(asset => asset.folderid)
      .map(asset => asset.folderid);

    const sharedDocumentIds = sharedAssets
      .filter(asset => asset.docid)
      .map(asset => asset.docid);

    const folders = await this.folderModel.find({ _id: { $in: sharedFolderIds } }).exec();
    const documents = await this.documentModel.find({ _id: { $in: sharedDocumentIds } }).exec();
console.log("folderl:",folders);
console.log("document",documents);
    return { folders, documents };
  }












  async getAllDocAndFolderby(Userid:string ,parentId: string, name: string, createdBy: string, sortupdated: string, createdDate: Date, lastUpdate: Date, page: number = 1, limit: number = 10) {


    const sharedAssets = await this.sharedModel.find({ userid: Userid }).exec();


    const sharedFolderIds = sharedAssets
        .filter(asset => asset.folderid)
        .map(asset => asset.folderid);

    const sharedDocumentIds = sharedAssets
        .filter(asset => asset.docid)
        .map(asset => asset.docid);

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
      query.createat = {$gte: createdDate};
    }
    if (lastUpdate) {
      query.Updateat = {$lte: lastUpdate};
    }
    if (name) {
      query.foldername = {$regex: `^${name}`, $options: 'i'};
    }

    let folderResult = await this.FolderRepository.findSharedWithPagination(query, sortupdated, page, limit,sharedFolderIds);
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
      query.title = {$regex: `^${name}`, $options: 'i'};
      query.foldername = null
    }
    try {
      let result = await this.DocumentRepo.findSharedWithPagination(query, sortupdated, page, limit,sharedDocumentIds);
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











async getAcceslevelbyUser({Userid, docID, foldID}: findSharedDto) {
    const sharedAssets = await this.sharedModel.find({ userid: Userid, }).exec();

    if (docID) {
        const sharedAsset = sharedAssets.find(asset => asset.docid == docID);
        if (sharedAsset) {
            return  sharedAsset.acceslevel;
        }
    } else if (foldID) {
      console.log("foldID",foldID);
        const sharedAsset = sharedAssets.find(asset => asset.folderid == foldID);
        if (sharedAsset) {
            return  sharedAsset.acceslevel;
        }
    }

}












}
