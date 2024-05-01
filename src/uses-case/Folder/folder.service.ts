import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FolderRepository } from "./Folder-repo/folder.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import mongoose, { Model, Types } from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { CreateFolderDto } from "./DTO/CreateFolder.dto";
import { SharedService } from "../../shared/shared-service/shared.service";
import { UpdateFolderDto } from "./DTO/UpdateFolder.dto";
import { UserRepository } from "../User";
import { SimpleFolderDto } from "./DTO/SimpleFolder.dto";

@Injectable()
export class FolderService {

  constructor(private folderRepository: FolderRepository,
              private userRepository: UserRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private Foldermodel: Model<Folder>,
              private sharedService: SharedService
  ) {
  }
  async AddFolder({ createdby, ...folder }: CreateFolderDto, parentID: string) {
    const baseFolderName = folder.foldername;
    let highestNumber = 0;
    let newFolderNumber=0;
    const regex = new RegExp(`^${baseFolderName}( \\(([0-9]+)\\))?$`);
  
    const folders = await this.folderRepository.find({ foldername: regex });
  
    folders.forEach((folder) => {
      const matches = folder.foldername.match(/\(([0-9]+)\)$/);
      if (matches && matches[1]) {
        const number = parseInt(matches[1], 10);
        if (number > highestNumber) {
          highestNumber = number;
        }
      }
    });

    if(folders.length!=0){
       newFolderNumber = highestNumber + 1;
    }
    const newFolderName = newFolderNumber === 0 ? baseFolderName : `${baseFolderName} (${newFolderNumber})`;
  
    if (this.sharedService.isValidObjectId(createdby)) {
      const folderData = {
        ...folder,
        createdby: createdby,
        foldername: newFolderName,
      };
  
      if (this.sharedService.isValidObjectId(parentID)) {
        folderData.parentfolder = parentID;
      }
  
      const newFolder = new this.Foldermodel(folderData);
  
      return await newFolder.save();
    } else {
      throw new HttpException("Invalid User ID", HttpStatus.BAD_REQUEST);
    }
  }


  async deleteFolder(id: string) {
    await this.folderRepository.delete(id);
    const subfolders = await this.folderRepository.find({ parentfolder: id });
    if (subfolders.length > 0) {
      for (const subfolder of subfolders) {
        await this.deleteFolder(subfolder.id);
      }
    }
  }




  FindAllFolder() {
    return this.folderRepository.findAll();
  }


  FindFolderByUser(UserID: string) {
    if (this.sharedService.isValidObjectId(UserID)) {
      return this.folderRepository.find({ createdby: UserID });
    }

  }

  FindFolderByParent(parentID: string) {
    return this.folderRepository.findOne({ parentfolder: parentID });

  }

  findOneFolder(id: string) {
    if (this.sharedService.isValidObjectId(id)) {
      return this.folderRepository.findById(id);

    }
  }

  findFolderByParent(parentID: string) {
    return this.folderRepository.find({ parentfolder: parentID });
  }

  UpdateFolder(id: string, Updatefolderdto: UpdateFolderDto) {
    if (this.sharedService.isValidObjectId(id)) {
      return this.folderRepository.update(id, Updatefolderdto);
    }

  }

  async getAllby(parentId: string, name: string, createdBy: string, createdDate: Date,sortupdated:string, lastUpdate: Date, page: number = 1, limit: number = 10) {
    const query: any = {};
  if (parentId && Types.ObjectId.isValid(parentId)) {
    query.parentfolder = new  Types.ObjectId(parentId);
  }
  if (createdBy && Types.ObjectId.isValid(createdBy)) {
    query.createdby = new  Types.ObjectId(createdBy);
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
  try {
    const result = await this.folderRepository.findAllWithPagination(query,sortupdated, page, limit);
    const totaldata = result.totaldata;
    const totalPages = Math.ceil(totaldata / limit);
    const data: SimpleFolderDto[] = result.data.map((folder: any) => {
      const simplefolderDto: SimpleFolderDto = new SimpleFolderDto();
      simplefolderDto.id = folder.id;
      simplefolderDto.title = folder.foldername;
      simplefolderDto.createdby = folder.createdby;
      simplefolderDto.createdat = folder.createdat;
      simplefolderDto.updatedat = folder.Updateat;
      return simplefolderDto;
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


  async deleteSelectedFolder(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      await this.deleteFolderRecursive(ids[i]);
    }
  }

  async deleteFolderRecursive(folderId: string) {
    await this.folderRepository.delete(folderId);

    const subfolders = await this.folderRepository.find({ parentfolder: folderId });

    if (subfolders.length > 0) {
      for (const subfolder of subfolders) {
        await this.deleteFolderRecursive(subfolder.id);
      }
    }
  }







}
