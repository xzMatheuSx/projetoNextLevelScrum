import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateVendaProdutoDto {
    @IsNotEmpty()
    @IsNumber()
    vendaId: number;
  
    @IsNotEmpty()
    @IsNumber()
    produtoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    quantidade: number;
  
    @IsNotEmpty()
    @IsString()
    unidadeMedidaVenda: string;
  
    @IsNotEmpty()
    @IsNumber()
    valorProduto: number;
  }