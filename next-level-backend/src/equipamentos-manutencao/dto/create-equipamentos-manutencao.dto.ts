import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentosManutencaoDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Equipamento id' })
    equipamentoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Usuario alteração' })
    usuarioAlt: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Data' })
    data: string;
  
    @IsString()
    @ApiProperty({ description: 'Obervação' })
    observacao?: string;
  }