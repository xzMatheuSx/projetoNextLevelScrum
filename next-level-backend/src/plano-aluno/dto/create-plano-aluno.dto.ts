import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreatePlanoAlunoDto {
    @IsNotEmpty()
    @IsNumber()
    planoId: number;
  
    @IsNotEmpty()
    @IsString()
    alunoMatricula: string;
  
    @IsNotEmpty()
    @IsString()
    dataInicio: string;
  
    @IsNotEmpty()
    @IsString()
    dataFinal: string;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioAlt: number;
  }