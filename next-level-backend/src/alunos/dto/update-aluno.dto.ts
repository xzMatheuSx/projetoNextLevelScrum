
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { IsCpf } from '../validator/cpf.validator';
import { IsTelefone } from '../validator/telefone.validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateAlunoDto {
    @IsOptional()
    @IsString()
        @ApiProperty({ description: 'Nome' })
    
    nome?: string;
  
    @IsOptional()
    @IsString()
    @IsCpf({ message: 'CPF inválido! O formato correto é 999.999.999-99' })
    @ApiProperty({ description: 'CPF' })

    cpf?: string;
  
    @IsOptional()
    @IsEmail()
        @ApiProperty({ description: 'Email' })
    
    email?: string;
  
    @IsOptional()
    @IsString()
    @IsTelefone({ message: 'Número de telefone inválido! Use o formato (99) 99999-9999 ou (99) 9999-9999.' })
    
    @ApiProperty({ description: 'Telefone' })
    telefone?: string;
  
    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'Dia vecimento' })

    diaVencimento?: number;
  
    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'Usuario alteração' })

    usuarioAlt?: number;

      @IsNotEmpty()
      @IsBoolean()
      @ApiProperty({ description: 'Ativo' })

      ativo: boolean;

      
  @ApiProperty({ description: 'Data nascimento' })
  @IsNotEmpty()
  dataNascimento: Date;

  @ApiProperty({ description: 'Horário estimado treino' })
  horarioEstimadoTreino: string;

  @ApiProperty({ description: 'Responsavel' })
  responsavel: string;
  }