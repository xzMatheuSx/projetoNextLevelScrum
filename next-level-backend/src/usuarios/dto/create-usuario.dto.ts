import { IsBoolean, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}