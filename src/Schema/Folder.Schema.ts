import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from "mongoose";
import { Documents } from "./Documents.Schema";
import { User } from "./User.Schema";

@Schema()

export class Folder extends Document{

  @Prop({ required: false })
    foldername: string;



  @Prop({ required: false, default:Date.now()})
  createdat: Date;

  @Prop({ default: Date.now })
  Updateat: Date;




  @Prop({ required: false })
  parentfolder: String;



  //@Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Documents' })
  //Documents?: Documents[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdby?: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
FolderSchema.pre<Folder>('save', function (next) {
  const currentDate = new Date();

  if (!this.createdat) {
    this.createdat = currentDate;
  }

  this.Updateat = currentDate;

  next();
});