import { IsNotEmpty } from "class-validator";
import { Aluno } from "src/alunos/entities/aluno.entity";
import { Plano } from "src/plano/entities/plano.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlanoAluno {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Plano, (plano) => plano.id)
  @JoinColumn({ name: "planoId" })  
  plano: Plano;

  @ManyToOne(() => Aluno, (aluno) => aluno.matricula)
  @JoinColumn({ name: "alunoMatricula" })  
  aluno: Aluno;

    @Column()
    dataInicio: Date;

    @Column()
    dataFinal: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    @JoinColumn({ name: "usuarioAltId" }) 
    usuarioAlt: Usuario;
}
