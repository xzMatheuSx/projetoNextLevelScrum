import { IsNotEmpty } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class EquipamentoTipo {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "string" })
    @IsNotEmpty()
    descricao: string
}
