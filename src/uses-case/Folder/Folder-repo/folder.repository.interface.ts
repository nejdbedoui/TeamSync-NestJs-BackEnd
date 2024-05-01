import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";
import { Folder } from "../../../Schema/Folder.Schema";

export interface FolderRepositoryInterface extends BaseInterfaceRepository<Folder> {
    findSharedWithPagination(query, sortupdated, page, limit,sharedFolderIds);

}
