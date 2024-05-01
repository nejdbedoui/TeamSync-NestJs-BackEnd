import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { DesignContentRepositoryInterface } from './designContent.repository.interface';
import { DesignContent } from 'src/Schema/DesignContent';


@Injectable()
export class DesignContentRepository extends BaseAbstractRepository<DesignContent> implements DesignContentRepositoryInterface {
  constructor(@InjectModel(DesignContent.name) private readonly DesignContentModel: Model<DesignContent>) {
    super(DesignContentModel);
  }

















}
