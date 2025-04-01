import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  
  @ApiProperty({ description: 'Nome' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Usuario' })

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}