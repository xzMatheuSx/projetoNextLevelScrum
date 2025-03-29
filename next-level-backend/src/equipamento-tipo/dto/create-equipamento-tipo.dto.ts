import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateEquipamentoTipoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;
  }
  
  export class UpdateEquipamentoTipoDto {
    @IsString()
    descricao?: string;
  }