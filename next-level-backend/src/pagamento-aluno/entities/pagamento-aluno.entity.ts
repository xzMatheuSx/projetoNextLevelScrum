import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class PagamentoAluno {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.matricula)
  aluno: Aluno;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuarioAlt: Usuario;

  @Column()
  data: string;

  @Column()
  valor: number;
}
