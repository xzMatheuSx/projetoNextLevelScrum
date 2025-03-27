import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;
  
    @IsNotEmpty()
    @IsNumber()
    produtoTipoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    valorCompra: number;
  
    @IsNotEmpty()
    @IsNumber()
    valorVenda: number;
  }
  