import { IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class CreatePlanoAlunoDto {
  @IsNotEmpty()
  @IsInt()
  plano: number;

  @IsNotEmpty()
  @IsInt()
  aluno: number;

  @IsNotEmpty()
  @IsDateString()
  dataInicio: Date;

  @IsNotEmpty()
  @IsDateString()
  dataFinal: Date;

  @IsNotEmpty()
  @IsInt()
  usuarioAlt: number;
}
