import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateMovimentoEstoqueDto {
    @IsNotEmpty()
    @IsString()
    tipo: string;
  
    @IsNotEmpty()
    @IsString()
    unidadeMedidaVenda: string;
  
    @IsNotEmpty()
    @IsString()
    data: string;
  
    @IsNotEmpty()
    @IsNumber()
    produtoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    quantidade: number;
  
    @IsNotEmpty()
    @IsNumber()
    usuarioAlt: number;
  }
  