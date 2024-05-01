import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";
import { Settings } from "../../../Schema/Settings.Schema";

export interface SettingsRepositoryInterface extends BaseInterfaceRepository<Settings> {

}
