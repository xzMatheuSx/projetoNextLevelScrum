import { Equipamento } from "src/equipamentos/entities/equipamento.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity()
export class EquipamentosManutencao {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Equipamento, { eager: true })
    @IsNotEmpty()
    equipamento: Equipamento;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;

    @Column( {type: "timestamp"} )
    data: Date;

    @Column({type: "varchar"})
    @IsNotEmpty()
    observacao: string
}
