
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty,IsString } from 'class-validator';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nome: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    usuario: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    senha: string;
}