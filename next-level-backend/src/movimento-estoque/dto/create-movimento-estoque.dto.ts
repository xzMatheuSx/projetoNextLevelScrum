import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsEnum } from 'class-validator';
import { MovimentoEstoqueTipo } from '../movimentoEstoqueTipo/movimento-estoque-tipo.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovimentoEstoqueDto {
  @IsNotEmpty()
  @IsEnum(MovimentoEstoqueTipo)
  @ApiProperty({ description: 'Tipo movimento (enum)' })
  tipo: MovimentoEstoqueTipo; 
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Unidade medida (enum)' })
  unidadeMedidaVenda: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Data' })
  data: string;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Produto ID' })
  produtoId: number;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Quantidade' })
  quantidade: number;
  
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Usuario alt' })
  usuarioAlt: number;
}
