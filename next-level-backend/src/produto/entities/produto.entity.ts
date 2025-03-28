import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { ProdutoTipo } from "src/produto-tipo/entities/produto-tipo.entity";

@Entity()
export class Produto {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    descricao: string;

    @ManyToOne(() => ProdutoTipo, { eager: true })
    @IsNotEmpty()
    produtoTipo: ProdutoTipo;

    @Column( { type: "numeric"})
    valorUltimaCompra: number;

    @Column( { type: "numeric"})
    valorUltimaVenda: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;
}
