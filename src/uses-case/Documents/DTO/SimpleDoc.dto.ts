import { IsOptional } from "class-validator";

export class SimpleDocDto {


    @IsOptional()
    id: string;

    @IsOptional()
    title: string;

    @IsOptional()
    type: string="document";

    @IsOptional()
    createdby: String;

    @IsOptional()
    createdat: Date;
    
    @IsOptional()
    updatedat: Date;






}