import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreatePagamentoAlunoDto {
    @IsNotEmpty()
    @IsNumber()
    alunoId: number;
  
    @IsNotEmpty()
    @IsString()
    data: string;
  
    @IsNotEmpty()
    @IsNumber()
    valor: number;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioAlt: number;
  }
  