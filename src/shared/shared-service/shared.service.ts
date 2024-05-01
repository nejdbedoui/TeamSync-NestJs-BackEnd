import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from "../../repositories/Base";
import { Types } from 'mongoose';

@Injectable()
export class SharedService {

  isValidObjectId(id: string): boolean {
    return Types.ObjectId.isValid(id);
  }


}


