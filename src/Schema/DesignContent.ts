import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export class Data {
    @Prop({ required: false })
    text: String;
  }
  
  export class Styles {
    @Prop({ required: false })
    name: String;
  
    @Prop({ required: false })
    value: String;
  }


  export class Content {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Document' })
    documentid: String="";
  
    @Prop({ required: false })
    position: number=null;
  
    @Prop({ required: false })
    type: string;
  
    @Prop({ required: false })
    data: Data;
  
    @Prop({ required: false })
    styles: Styles[];
  }

@Schema()
export class DesignContent extends mongoose.Document {

  @Prop({ required: false })
  position: number;

  @Prop({ required: false })
  category: string;

  @Prop({ required: false })
  content: Content[];
}

export const DesignContentSchema = SchemaFactory.createForClass(DesignContent);
