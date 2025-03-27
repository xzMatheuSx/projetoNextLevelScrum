
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateAlunoPresencaDto {
    @IsNotEmpty()
    @IsString()
    momento: string;
  
    @IsNotEmpty()
    @IsString()
    alunoMatricula: string;
  
    @IsNotEmpty()
    @IsString()
    tipo: string;
  }