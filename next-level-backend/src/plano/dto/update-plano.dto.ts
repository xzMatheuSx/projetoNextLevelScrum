import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoDto } from './create-plano.dto';
import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descrição' })
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Qtd dias semana' })
  qtdDiasSemana?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Valor' })
  valor?: number;
}