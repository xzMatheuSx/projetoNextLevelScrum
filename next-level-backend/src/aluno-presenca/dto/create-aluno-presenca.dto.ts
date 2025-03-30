
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateAlunoPresencaDto {
    @IsNotEmpty()
    @IsString()
    momento: string;
  
    @IsNotEmpty()
    @IsNumber()
    alunoMatricula: number;
  
    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsString()
    usuarioAltId: string;
  }