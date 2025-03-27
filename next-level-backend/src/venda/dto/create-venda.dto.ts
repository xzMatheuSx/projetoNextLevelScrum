import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateVendaDto {
    @IsNotEmpty()
    @IsNumber()
    alunoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    valorTotal: number;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioAlt: number;
  }