import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { VersionHistoryRepositoryInterface } from "./VersionHistory.repository.interface";
import { VersionHistory } from "../../../Schema/VersionHistory.Schema";


@Injectable()
export class VersionHistoryRepository extends BaseAbstractRepository<VersionHistory> implements VersionHistoryRepositoryInterface {
  constructor(@InjectModel(VersionHistory.name) private readonly VersionHistoryModel: Model<VersionHistory>) {
    super(VersionHistoryModel);
  }



















}
