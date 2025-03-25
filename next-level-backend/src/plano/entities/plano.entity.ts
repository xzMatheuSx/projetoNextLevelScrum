import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity()
export class Plano {

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    @IsNotEmpty()
    @IsString()
    descricao: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    qtdDiasSemana: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    valor: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
