import { Column, PrimaryGeneratedColumn } from "typeorm";
import { isBoolean, IsNotEmpty  } from "class-validator";
import { UnidadeMedida } from "../unidadeMedida/unidade-medida.enum";

export class ProdutoTipo {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    @IsNotEmpty()
    descricao: string;

    @Column({ type: 'boolean'})
    @IsNotEmpty()
    vendaAGranel: boolean;

    @Column()
    @IsNotEmpty()
    unidadeMedida: UnidadeMedida
}
