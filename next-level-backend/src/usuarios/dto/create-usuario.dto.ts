import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  
  @ApiProperty({ description: 'Nome do aluno' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Usuario do aluno' })

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty({ description: 'Email do aluno' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do aluno' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}