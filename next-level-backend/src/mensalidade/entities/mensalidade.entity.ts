import { Aluno } from "src/alunos/entities/aluno.entity";
import { Plano } from "src/plano/entities/plano.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('mensalidades')
export class Mensalidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, aluno => aluno.mensalidades)
  aluno: Aluno;

  @Column({ type: 'date' })
  vencimento: Date;

  @Column({ default: false })
  pago: boolean;

  @Column({ type: 'date', nullable: true })
  dataPagamento: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => Plano, plano => plano.valor)
plano: Plano;

}
