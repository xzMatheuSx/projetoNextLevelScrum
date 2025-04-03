import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { UnidadeMedida } from '../unidadeMedida/unidade-medida.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProdutoTipoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Descrição' })
    
    descricao: string;
  
    @IsNotEmpty()
    @ApiProperty({ description: 'Venda à granel' })

    vendaAGranel: boolean;
  
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Unidade medida' })

    unidadeMedida: UnidadeMedida;
  }