
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { Settings } from "../../../Schema/Settings.Schema";
import { CreatUserSettings } from "../../User/DTO/CreatUser.dto";
import { User } from "../../../Schema/User.Schema";



export class CreateFolderDto{
@IsOptional()
foldername: string;



  @IsOptional()
parentfolder: String;

  @IsOptional()
  createdat: Date;


  @IsOptional()
    createdby?:string ;

}