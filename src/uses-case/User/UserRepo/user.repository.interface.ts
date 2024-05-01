import { User } from 'src/Schema/User.Schema';
import { BaseInterfaceRepository } from "../../../repositories/Base";

export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
