import { Aluno } from "src/alunos/entities/aluno.entity";
import { Plano } from "src/plano/entities/plano.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComprovantePagamento } from "./comprovante.entity";

@Entity('mensalidades')
export class Mensalidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, aluno => aluno.mensalidades)
  aluno: Aluno;

  @Column()
  vencimento: string;

  @Column({ default: false })
  pago: boolean;

  @Column()
  dataPagamento: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => Plano, plano => plano.valor)
plano: Plano;

@OneToMany(() => ComprovantePagamento, (comprovante) => comprovante.mensalidade)
comprovantes: ComprovantePagamento[];

}
