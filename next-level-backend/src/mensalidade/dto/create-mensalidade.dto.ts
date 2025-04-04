import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMensalidadeDto {

    @IsNotEmpty()
    @IsNumber()
    matricula: number

    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsNumber()
    vencimento: Date
}
