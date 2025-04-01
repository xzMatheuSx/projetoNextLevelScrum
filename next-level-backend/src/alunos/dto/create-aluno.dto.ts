import { IsNotEmpty, IsString, IsEmail, IsNumber, IsBoolean } from 'class-validator';
import { IsCpf } from '../validator/cpf.validator';
import { IsTelefone } from '../validator/telefone.validator';
import { Timestamp } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  
  @IsNotEmpty()
  @IsString()
      @ApiProperty({ description: 'Nome' })
  
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsCpf({ message: 'CPF inválido! O formato correto é 999.999.999-99' })
  @ApiProperty({ description: 'CPF' })

  cpf: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @ApiProperty({ description: 'Email' })

  email: string;

  @IsNotEmpty()
  @IsString()
  @IsTelefone({ message: 'Número de telefone inválido! Use o formato (99) 99999-9999 ou (99) 9999-9999.' })
  @ApiProperty({ description: 'Telefone' })

  telefone: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Dia vencimento' })

  diaVencimento: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Usuario alt' })

  usuarioAltId: string;


}
