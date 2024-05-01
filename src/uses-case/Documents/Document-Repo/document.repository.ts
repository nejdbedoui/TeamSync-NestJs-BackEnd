import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { DocumentRepositoryInterface } from "./document.repository.interface";
import { Documents } from "../../../Schema/Documents.Schema";
import {query} from "express";
import {skip} from "rxjs";


@Injectable()
export class DocumentRepository extends BaseAbstractRepository<Documents> implements DocumentRepositoryInterface {
  constructor(@InjectModel(Documents.name) private readonly documentsModel: Model<Documents>) {
    super(documentsModel);
  }


  async findAllWithPagination(query: any,sortBy:string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.documentsModel.find(query).skip(skip).limit(limit).sort({ Updateat: sortBy === 'asc' ? 1 : -1 }).exec();
    const totaldata = await this.documentsModel.countDocuments(query);
    return { data, totaldata };
  }

  async findSharedWithPagination(query, sortupdated, page, limit, sharedDocumentIds) {
    const skip = (page - 1) * limit;
    // momken fema erreur fi query
    const data = await this.documentsModel.find({ $and: [{ _id: { $in: sharedDocumentIds } }, query] }).skip(skip).limit(limit).sort({ Updateat: sortupdated === 'asc' ? 1 : -1 }).exec();
    const totaldata = await this.documentsModel.countDocuments(query);
    return { data, totaldata };

  }
















}
