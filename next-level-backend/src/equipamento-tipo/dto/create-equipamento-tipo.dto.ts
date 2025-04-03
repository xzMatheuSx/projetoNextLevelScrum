import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentoTipoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Descrição' })
    descricao: string;
  }
  
  export class UpdateEquipamentoTipoDto {
    @IsString()
    descricao?: string;
  }