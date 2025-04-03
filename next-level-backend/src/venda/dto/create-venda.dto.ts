import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateVendaDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Aluno id' })
    alunoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Valor total' })
    valorTotal: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Usuario alt' })
    usuarioAlt: number;
  }