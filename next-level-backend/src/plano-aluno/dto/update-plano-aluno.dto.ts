import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoAlunoDto } from './create-plano-aluno.dto';
import { IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdatePlanoAlunoDto extends PartialType(CreatePlanoAlunoDto) {
  @IsOptional()
  @IsNumber()
  plano?: number; 

  @IsOptional()
  @IsDateString()
  dataInicio?: Date; 

  @IsOptional()
  @IsDateString()
  dataFinal?: Date; 

  @IsOptional()
  @IsNumber()
  usuarioAlt?: number; 
}