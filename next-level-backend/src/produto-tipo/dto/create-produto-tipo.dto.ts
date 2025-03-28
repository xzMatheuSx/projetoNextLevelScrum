import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { UnidadeMedida } from '../unidadeMedida/unidade-medida.enum';
export class CreateProdutoTipoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;
  
    @IsNotEmpty()
    vendaAGranel: boolean;
  
    @IsNotEmpty()
    @IsString()
    unidadeMedida: UnidadeMedida;
  }