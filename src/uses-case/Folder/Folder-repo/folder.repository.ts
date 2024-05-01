import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { Folder } from "../../../Schema/Folder.Schema";
import { FolderRepositoryInterface } from "./folder.repository.interface";
import {query} from "express";
import {skip} from "rxjs";


@Injectable()
export class FolderRepository extends BaseAbstractRepository<Folder> implements FolderRepositoryInterface {
  constructor(@InjectModel(Folder.name) private readonly FolderModue: Model<Folder>) {
    super(FolderModue);
  }



  async findAllWithPagination(query: any,sortBy:string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.FolderModue.find(query).skip(skip).limit(limit).sort({ Updateat: sortBy === 'asc' ? 1 : -1 }).exec();
    const totaldata = await this.FolderModue.countDocuments(query);
    return { data, totaldata };
  }

  async findSharedWithPagination(query, sortupdated, page, limit, sharedFolderIds) {
    const skip = (page - 1) * limit;
    const data = await this.FolderModue.find({ $and: [{ _id: { $in: sharedFolderIds } }, query] }).skip(skip).limit(limit).sort({ Updateat: sortupdated === 'asc' ? 1 : -1 }).exec();
    const totaldata = await this.FolderModue.countDocuments(query);
    return { data, totaldata };

  }


















}
