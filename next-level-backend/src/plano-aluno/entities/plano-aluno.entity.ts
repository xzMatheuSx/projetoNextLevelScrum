import { IsNotEmpty } from "class-validator";
import { Aluno } from "src/alunos/entities/aluno.entity";
import { Plano } from "src/plano/entities/plano.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlanoAluno {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Plano, { eager: true })
    @IsNotEmpty()
    plano: Plano;

    @ManyToOne(() => Aluno, { eager: true })
    @IsNotEmpty()
    aluno: Aluno;

    @Column()
    dataInicio: Date;

    @Column()
    dataFinal: Date;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
