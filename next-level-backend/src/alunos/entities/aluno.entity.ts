import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario} from 'src/usuarios/entities/usuario.entity';
export class Aluno {

    @PrimaryGeneratedColumn()
    matricula:number

    @Column()
    nome:string

    @Column()
    cpf: string

    @Column()
    email:string

    @Column()
    diaVencimento: string

    
    @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuarioAlt: Usuario;

}
