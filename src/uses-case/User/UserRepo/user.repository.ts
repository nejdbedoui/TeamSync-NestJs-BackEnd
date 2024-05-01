import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { UserRepositoryInterface } from "./user.repository.interface";


@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
  
  async findByEmail(email: string): Promise<User> {
    return this.findOne({  email });
  }

  async findUserWithNumber(usernameWithNumber: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username: usernameWithNumber });
    return !!user;
  }

  async findUnconfirmedUsers(): Promise<User[]> {
    return await this.find({ where: { isEmailConfirmed: false } });
  }


}
