import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoAlunoDto } from './create-plano-aluno.dto';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanoAlunoDto extends PartialType(CreatePlanoAlunoDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Plano' })
  plano?: number; 

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'Data inicio' })
  dataInicio?: Date; 

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'Data fim' })
  dataFinal?: Date; 

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Usuario alt' })
  usuarioAlt?: number; 
}