import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateAlunoDto {
  
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsNumber()
  diaVencimento: string;

  @IsNotEmpty()
  @IsNumber()
  usuarioAltId: string;
}
