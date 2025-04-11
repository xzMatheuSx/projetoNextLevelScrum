import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaidaDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Matrícula do aluno' })
  alunoMatricula: number;
}