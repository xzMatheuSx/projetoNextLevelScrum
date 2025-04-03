import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Descrição' })
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Qtd dias semana' })
    qtdDiasSemana: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Valor' })
    valor: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Usuario alt' })
    usuarioAltId: number;
}
