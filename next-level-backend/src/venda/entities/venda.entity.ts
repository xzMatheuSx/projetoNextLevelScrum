import { Aluno } from "src/alunos/entities/aluno.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { VendaProduto } from "src/venda-produto/entities/venda-produto.entity";

@Entity()
export class Venda {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Aluno, { eager: true })
    @IsNotEmpty()
    aluno: Aluno;

    @Column({ type: "numeric" })
    @IsNotEmpty()
    valorTotal: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;

    @OneToMany(() => VendaProduto, (vendaProduto) => vendaProduto.venda, { cascade: true })
    vendaProdutos: VendaProduto[]
}
