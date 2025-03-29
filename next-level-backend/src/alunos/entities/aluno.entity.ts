import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, Timestamp } from 'typeorm';
import { Usuario} from 'src/usuarios/entities/usuario.entity';
import { IsNotEmpty, IsString } from 'class-validator';
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

    @Column()
    diaVencimento: number

    
    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    usuarioAlt: Usuario;

    
  @Column({ default: true })
  ativo: boolean = true

  @Column({ nullable: true }) 
  dataDesativo?: Date;

}
