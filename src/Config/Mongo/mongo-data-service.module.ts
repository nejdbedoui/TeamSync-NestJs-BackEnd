import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { DATA_BASE_CONFIGURATION } from './Index';


@Module({

imports:[MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString)],
  providers:[],
exports:[]
})
export class MongoDataServiceModule {
}
