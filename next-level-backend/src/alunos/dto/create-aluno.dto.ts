import { IsNotEmpty, IsString, IsEmail, IsNumber, IsBoolean } from 'class-validator';
import { IsCpf } from '../validator/cpf.validator';
import { IsTelefone } from '../validator/telefone.validator';
import { Timestamp } from 'typeorm';

export class CreateAlunoDto {
  
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsCpf({ message: 'CPF inválido! O formato correto é 999.999.999-99' })
  cpf: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsTelefone({ message: 'Número de telefone inválido! Use o formato (99) 99999-9999 ou (99) 9999-9999.' })
  telefone: string;

  @IsNotEmpty()
  @IsNumber()
  diaVencimento: number;

  @IsNotEmpty()
  @IsNumber()
  usuarioAltId: string;


}
