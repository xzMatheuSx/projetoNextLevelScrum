import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn, OneToMany } from 'typeorm';
import { Usuario} from 'src/usuarios/entities/usuario.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Mensalidade } from 'src/mensalidade/entities/mensalidade.entity';
@Entity()
export class Aluno {

    @PrimaryGeneratedColumn()
    matricula:number

    @Column()
    @IsNotEmpty()
    @IsString()
    nome:string

    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    cpf: string

    @Column()
    email:string

    @Column()
    telefone:string

    @Column({nullable:true})
    diaVencimento: number

    
    @ManyToOne(() => Usuario, { eager: true }) 
@JoinColumn({ name: "usuarioAlt" }) 
usuarioAlt: Usuario;

    
  @Column({ default: true })
  ativo: boolean = true

  @Column({ nullable: true }) 
  dataDesativo?: Date;


  @Column({ nullable: true })
  dataNascimento: Date

  @Column({ nullable: true }) 
  horarioEstimadoTreino: string

  @Column({ nullable: true }) 
  responsavel: string

  @OneToMany(() => Mensalidade, mensalidade => mensalidade.aluno)
  mensalidades: Mensalidade[];
}
