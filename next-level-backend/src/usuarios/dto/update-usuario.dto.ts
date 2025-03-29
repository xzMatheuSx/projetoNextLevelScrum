import { IsOptional, IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  usuario?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  senha?: string;
}