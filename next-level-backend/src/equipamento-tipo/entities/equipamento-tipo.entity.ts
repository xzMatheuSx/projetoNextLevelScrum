import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EquipamentoTipo {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    @IsNotEmpty()
    descricao: string
}
