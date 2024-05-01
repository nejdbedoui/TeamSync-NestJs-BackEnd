import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";
import { Folder } from "../../../Schema/Folder.Schema";
import { SharedAssets } from "../../../Schema/SharedAssets.Schema";

export interface SharedAssetsRepositoryInterface extends BaseInterfaceRepository<SharedAssets> {

}
