import { IsNotEmpty } from 'class-validator';
import { EquipamentoTipo } from 'src/equipamento-tipo/entities/equipamento-tipo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    @IsNotEmpty()
    descricao: string;

    @ManyToOne(() => EquipamentoTipo, { eager: true })
    @IsNotEmpty()
    equipamentoTipo: EquipamentoTipo;
    
    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
