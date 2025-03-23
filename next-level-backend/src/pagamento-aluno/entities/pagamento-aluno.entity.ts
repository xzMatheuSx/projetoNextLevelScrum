import { Aluno } from "src/alunos/entities/aluno.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, isNumber } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class PagamentoAluno {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Aluno, { eager: true })
    @IsNotEmpty()
    alunoMatricula: Aluno;

    @Column()
    @IsNotEmpty()
    data: Date;

    @Column()
    @IsNotEmpty()
    valor: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
