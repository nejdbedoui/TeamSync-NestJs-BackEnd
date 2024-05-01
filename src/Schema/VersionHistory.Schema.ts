import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Documents } from "./Documents.Schema";

@Schema()
export class VersionHistory extends Document{


  @Prop({ required: false })
  Action: string;

  @Prop({ required: false })
  TimesTamp: Date;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Documents' })
  documentid?: Documents;

}

export const VersionHistorySchema = SchemaFactory.createForClass(VersionHistory);
