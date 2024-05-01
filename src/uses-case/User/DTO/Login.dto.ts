import { IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  email: string;

}