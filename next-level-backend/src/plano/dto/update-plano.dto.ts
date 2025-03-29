import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoDto } from './create-plano.dto';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {
  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  qtdDiasSemana?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;
}