import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";
import { VersionHistory } from "../../../Schema/VersionHistory.Schema";

export interface VersionHistoryRepositoryInterface extends BaseInterfaceRepository<VersionHistory> {

}
