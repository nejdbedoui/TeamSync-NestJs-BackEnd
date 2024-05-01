import { Model, Document, model, Error, Promise } from "mongoose";
import { BaseInterfaceRepository } from "./base.interface.repository";
import { filter } from "rxjs";

export abstract class BaseAbstractRepository<T extends Document> implements BaseInterfaceRepository<any> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: any): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }





  /*

   //fonction filter t3ayltha heka
  async getUsers(): Promise<User[]> {
    // Vous pouvez construire votre filtre ici si nécessaire
    const filter = { /* votre filtre ici  }; o fi filter tamel kima thheb


    example :
                const filter = { username: 'john_doe' };
                const filter = { Role: 'admin' };
                const filter = { age: { $gte: 25, $lte: 35 } };

return await this.userService.getUsersByFilter(filter);

   */

  async updateUserFirstnameAndLastname(id: string, firstname: string, lastname: string): Promise<T | null> {
    const dataToUpdate = {
      firstname: firstname,
      lastname: lastname
    };
    return await this.model.findByIdAndUpdate(id, dataToUpdate, { new: true }).exec();
  }


  async find(filter: any): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    const result = await this.model.findByIdAndDelete(id);
    return await result;
  }

  findAll(): Promise<any[]> {
    return this.model.find();
  }


}
