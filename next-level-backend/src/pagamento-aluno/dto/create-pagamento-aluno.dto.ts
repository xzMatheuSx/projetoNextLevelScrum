import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreatePagamentoAlunoDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Aluno ID' })
    alunoId: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Data' })

    data: string;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Valor' })

    valor: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Usuario alteração' })

    usuarioAlt: number;
  }
  