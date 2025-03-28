import { Produto } from "src/produto/entities/produto.entity";
import { Venda } from "src/venda/entities/venda.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity()
export class VendaProduto {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Venda, (venda) => venda.vendaProdutos)
    venda: Venda;

    @ManyToOne(() => Produto, { eager: true })
    @IsNotEmpty()
    produto: Produto;

    @Column({type: "numeric"})
    quantidade: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;

}
