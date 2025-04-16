
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateAlunoPresencaDto {

  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Aluno matricula' })

    alunoMatricula: number;
  

  }