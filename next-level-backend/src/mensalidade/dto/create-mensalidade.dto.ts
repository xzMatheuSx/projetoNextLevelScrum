import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMensalidadeDto {

    @IsNotEmpty()
    @IsNumber()
    matricula: number

    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsBoolean()
    pago: boolean

    @IsNotEmpty()
    @IsString()
    dataPagamento: string;

    @IsNotEmpty()
    @IsString()
    vencimento: string
}
