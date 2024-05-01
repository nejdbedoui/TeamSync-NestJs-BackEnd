import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { Folder } from "../../../Schema/Folder.Schema";
import { SharedAssets } from "../../../Schema/SharedAssets.Schema";
import { SharedAssetsRepositoryInterface } from "./SharedAssets.repository.interface";
import { AccesLevel } from 'src/Schema/Enum/AccesLevel';


@Injectable()
export class SharedAssetsRepository extends BaseAbstractRepository<SharedAssets> implements SharedAssetsRepositoryInterface {
  constructor(@InjectModel(SharedAssets.name) private readonly SharedAssetsModule: Model<SharedAssets>,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private folderModel: Model<Folder>,
              ) {
    super(SharedAssetsModule);
  }




  private async createSharedAssetsForSubfolders(folder: Folder, userId: string, accessLevel: AccesLevel) {
    const subfolders = await this.folderModel.find({ parentfolder: folder._id });
    for (const subfolder of subfolders) {
      // Créer un SharedAssets pour chaque sous-dossier
      const sharedAssets = new this.SharedAssetsModule({
        folder: subfolder._id,
        user: userId,
        accessLevel: accessLevel,
      });
      await sharedAssets.save();

      // Appeler récursivement la fonction pour les sous-sous-dossiers
      await this.createSharedAssetsForSubfolders(subfolder, userId, accessLevel);
    }
  }














}
