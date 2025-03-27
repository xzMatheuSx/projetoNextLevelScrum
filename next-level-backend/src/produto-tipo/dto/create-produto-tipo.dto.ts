import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProdutoTipoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;
  
    @IsNotEmpty()
    vendaAGranel: boolean;
  
    @IsNotEmpty()
    @IsString()
    unidadeMedida: string;
  }