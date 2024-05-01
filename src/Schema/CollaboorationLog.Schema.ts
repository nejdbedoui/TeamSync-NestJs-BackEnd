import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { User } from "./User.Schema";
import { Documents } from "./Documents.Schema";
@Schema()
export class CollaboorationLog extends Document{

  @Prop({ required: false })
  action: string;


  @Prop({ required: false })
  timesstamp: Date;



  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' })
  documentid?: Documents;

}
export const CollaboorationLogSchema = SchemaFactory.createForClass(CollaboorationLog);