import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Mensalidade } from 'src/mensalidade/entities/mensalidade.entity';

@Entity()
export class ComprovantePagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Mensalidade, (mensalidade) => mensalidade.comprovantes, { eager: true })
  mensalidade: Mensalidade;

  @Column()
  alunoNome: string;

  @Column()
  planoNome: string;

  @Column('decimal')
  valor: number;

  @Column()
  vencimento: string;
  
  @Column()
  pago: boolean;

  @Column({ nullable: true })
  dataPagamento: Date;
}
