import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Descrição' })
    descricao: string;
  
    @ApiProperty({ description: 'Equipamento tipo' })
    @IsNotEmpty()
    @IsNumber()
    equipamentoTipoId: number;
    
    @ApiProperty({ description: 'Usuario alteração' })
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
  }