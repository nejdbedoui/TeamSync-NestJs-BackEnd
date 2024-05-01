import { Role } from "src/Schema/Enum/Role";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { Settings } from "../../../Schema/Settings.Schema";

export class CreatUserSettings {
  @IsBoolean()
  @IsOptional()
  enlignestatut?: boolean;

  @IsOptional()
  @IsBoolean()
  statut?: boolean;
}

export class CreatUserDto {

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  Role: Role;

  @IsBoolean()
  @IsOptional()
  isEmailConfirmed: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatUserSettings)
  settings?: Settings;

  @IsString()
  @IsOptional()
  twoFactorAuthenticationSecret: string

  @IsBoolean()
  @IsOptional()
  isTwoFactorAuthenticationEnabled: boolean

  @IsString()
  @IsOptional()
  passResetToken: string
}
