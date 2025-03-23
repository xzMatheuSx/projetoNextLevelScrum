import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Usuario} from 'src/usuarios/entities/usuario.entity';
import { isString } from 'util';
import { IsNotEmpty, IsString } from 'class-validator';
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

}
