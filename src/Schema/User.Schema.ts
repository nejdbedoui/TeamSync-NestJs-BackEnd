import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { Role } from "./Enum/Role";
import { Settings } from "./Settings.Schema";
import { Folder } from "./Folder.Schema";
import { SharedAssets } from "./SharedAssets.Schema";


@Schema()
export class User extends Document {


  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: false })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  Role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Settings' })
  settings?: Settings;

  @Prop({ required: false })
  isEmailConfirmed: boolean;

  @Prop({ required: false })
  twoFactorAuthenticationSecret?: string;

  @Prop({ required: false })
  isTwoFactorAuthenticationEnabled: boolean;

  @Prop({ required: false })
  currentHashedRefreshToken?: string;

  @Prop({ required: false })
  passResetToken: string;

  @Prop({ required: false })
  profilePicture: string; 

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }], default: [] })
  // folders?: Folder[];

  //@Prop({ type:[{type:mongoose.Schema.Types.ObjectId, ref: 'SharedAssets' }],default:[]})
  // sharedassets?: SharedAssets[];
}

export const UserSchema = SchemaFactory.createForClass(User);
