import { Aluno } from "src/alunos/entities/aluno.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity()
export class Presenca {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, { eager: true })
  aluno: Aluno;

  @Column({ type: 'timestamp', nullable: false })
  entrada: Date;

  @Column({ type: 'timestamp', nullable: true })
  saida: Date;

  @Column({ type: 'int', nullable: true }) 
  duracao: number;
}
