import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;
  
    @IsNotEmpty()
    @IsNumber()
    equipamentoTipoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;
  }