import { IsOptional } from "class-validator";

export class SimpleFolderDto {


    @IsOptional()
    id: string;

    @IsOptional()
    title: string;

    @IsOptional()
    type: string="folder";

    @IsOptional()
    createdby: String;

    @IsOptional()
    createdat: Date;
    
    @IsOptional()
    updatedat: Date;




}