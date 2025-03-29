import { Aluno } from "src/alunos/entities/aluno.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity()
export class AlunoPresenca {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "timestamp"})
    momento: Date;
    
    @ManyToOne(() => Aluno, { eager: true })
    @IsNotEmpty()
    alunoMatricula: Aluno;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
