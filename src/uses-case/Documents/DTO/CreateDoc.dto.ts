import { IsOptional } from "class-validator";

export class CreateDocDto{


@IsOptional()
  title: string;

  @IsOptional()
  createdby: String;

  @IsOptional()
  parentfolder: String;




}