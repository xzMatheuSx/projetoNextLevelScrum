
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty,IsString } from 'class-validator';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    usuario: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column({ default: true })
    ativo: boolean;
}