import { IsOptional } from "class-validator";

export class UpdateFolderDto {
  @IsOptional()
  foldername: string;


}