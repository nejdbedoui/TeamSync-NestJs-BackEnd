import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { SettingsRepositoryInterface } from "./Settings.repository.interface";
import { Settings } from "../../../Schema/Settings.Schema";


@Injectable()
export class SettingsRepository extends BaseAbstractRepository<Settings> implements SettingsRepositoryInterface {
  constructor(@InjectModel(Settings.name) private readonly SettingsModel: Model<Settings>) {
    super(SettingsModel);
  }



















}
