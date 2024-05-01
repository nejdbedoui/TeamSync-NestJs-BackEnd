import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";
import { Documents } from "../../../Schema/Documents.Schema";

export interface DocumentRepositoryInterface extends BaseInterfaceRepository<Documents> {
    findSharedWithPagination(query, sortupdated, page, limit,sharedDocumentIds)
}
