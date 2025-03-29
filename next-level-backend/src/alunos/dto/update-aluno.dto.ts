
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
export class UpdateAlunoDto {
    @IsOptional()
    @IsString()
    nome?: string;
  
    @IsOptional()
    @IsString()
    cpf?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    telefone?: string;
  
    @IsOptional()
    @IsNumber()
    diaVencimento?: number;
  
    @IsOptional()
    @IsNumber()
    usuarioAltId?: number;
  }