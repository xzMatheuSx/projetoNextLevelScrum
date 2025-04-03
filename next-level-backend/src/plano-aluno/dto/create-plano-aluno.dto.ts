import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class CreatePlanoAlunoDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Plano' })
  plano: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Aluno' })
  aluno: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Data inicio' })
  dataInicio: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Data fim' })
  dataFinal: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Usuario alt' })
  usuarioAlt: number;
}
