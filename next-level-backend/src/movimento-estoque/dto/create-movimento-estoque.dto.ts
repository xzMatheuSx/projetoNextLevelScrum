import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsEnum } from 'class-validator';
import { MovimentoEstoqueTipo } from '../movimentoEstoqueTipo/movimento-estoque-tipo.enum';
export class CreateMovimentoEstoqueDto {
  @IsNotEmpty()
  @IsEnum(MovimentoEstoqueTipo)
  tipo: MovimentoEstoqueTipo; 
  
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
