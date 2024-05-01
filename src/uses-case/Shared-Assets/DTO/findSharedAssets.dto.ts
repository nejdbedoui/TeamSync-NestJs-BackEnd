import { Prop } from "@nestjs/mongoose";
import { AccesLevel } from "../../../Schema/Enum/AccesLevel";
import { IsOptional } from "class-validator";
import { User } from "src/Schema/User.Schema";
import { Folder } from "../../../Schema/Folder.Schema";



export class findSharedDto {



  @IsOptional()
  Userid: string;

  @IsOptional()
  foldID:string

  @IsOptional()
  docID:string

}