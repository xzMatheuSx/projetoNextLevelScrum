import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEquipamentoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  dataCompra: string;

  @IsString()
  dataManutencao?: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  equipamentoTipoId: number;

  @IsNotEmpty()
  usuarioAltId: number;
}