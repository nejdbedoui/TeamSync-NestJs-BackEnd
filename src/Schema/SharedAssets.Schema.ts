import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { AccesLevel } from "./Enum/AccesLevel";
import { User } from "./User.Schema";
import { Documents } from "./Documents.Schema";
import { Folder } from "./Folder.Schema";


@Schema()
export class  SharedAssets extends Document{


  @Prop({ required: false })
  acceslevel: AccesLevel;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userid?: User;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' })
  docid?: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' })
  folderid?: string;

}
export const SharedAssetsSchema = SchemaFactory.createForClass(SharedAssets);