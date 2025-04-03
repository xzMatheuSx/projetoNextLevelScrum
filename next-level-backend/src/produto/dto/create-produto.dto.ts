import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Descrição' })
    descricao: string;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Produto tipo' })
    produtoTipoId: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Valor compra' })
    valorCompra: number;
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Valor venda' })
    valorVenda: number;
  }
  