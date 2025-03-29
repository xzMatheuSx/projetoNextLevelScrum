
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { IsCpf } from '../validator/cpf.validator';
import { IsTelefone } from '../validator/telefone.validator';
export class UpdateAlunoDto {
    @IsOptional()
    @IsString()
    nome?: string;
  
    @IsOptional()
    @IsString()
    @IsCpf({ message: 'CPF inválido! O formato correto é 999.999.999-99' })
    cpf?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @IsTelefone({ message: 'Número de telefone inválido! Use o formato (99) 99999-9999 ou (99) 9999-9999.' })
    telefone?: string;
  
    @IsOptional()
    @IsNumber()
    diaVencimento?: number;
  
    @IsOptional()
    @IsNumber()
    usuarioAltId?: number;

      @IsNotEmpty()
      @IsBoolean()
      ativo: boolean;

  }