import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    qtdDiasSemana: string;

    @IsNotEmpty()
    @IsNumber()
    valor: number;

    @IsNotEmpty()
    @IsNumber()
    usuarioAltId: number;
}
