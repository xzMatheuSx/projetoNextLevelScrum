
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateAlunoPresencaDto {
    @IsNotEmpty()
    @IsString()
        @ApiProperty({ description: 'Momento' })
    
    momento: string;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Aluno matricula' })

    alunoMatricula: number;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Tipo' })

    tipo: string;

    @IsString()
    @ApiProperty({ description: 'Usuario alt' })

    usuarioAltId: string;
  }