import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { CollabLogRepositoryInterface } from "./CollabLog.repository.interface";
import { CollaboorationLog } from "../../../Schema/CollaboorationLog.Schema";


@Injectable()
export class CollabLogRepository extends BaseAbstractRepository<CollaboorationLog> implements CollabLogRepositoryInterface {
  constructor(@InjectModel(CollaboorationLog.name) private readonly collaboorationLogModel: Model<CollaboorationLog>) {
    super(collaboorationLogModel);
  }




















}
