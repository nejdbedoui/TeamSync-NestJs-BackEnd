import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { CollaboorationLog } from "./CollaboorationLog.Schema";
import { VersionHistory } from "./VersionHistory.Schema";
import { User } from "./User.Schema";
import { Folder } from "./Folder.Schema";
@Schema()
export class Documents extends Document {
  @Prop({ required: false })
  title: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Content' })
  // content: mongoose.Types.ObjectId;

  @Prop({ required: false , default: Date.now()})
  createat: Date;

  @Prop({ default: Date.now })
  Updateat: Date;

  @Prop({ type: [{type:mongoose.Schema.Types.ObjectId, ref: 'CollaboorationLog' }],default:[]})
  CollaboorationLogs?: CollaboorationLog[];


  @Prop({ type:[{type:mongoose.Schema.Types.ObjectId, ref: 'VersionHistory' }],default:[]})
  VersionHistorys?: VersionHistory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdby?: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' })
  parentfolder?: string;

}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
DocumentsSchema.pre<Documents>('save', function (next) {
  const currentDate = new Date();
  if (!this.createat) {
    this.createat = currentDate;
  }
  this.Updateat = currentDate;
  next();
});


