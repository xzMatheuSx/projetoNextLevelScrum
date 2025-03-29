import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovimentoEstoqueTipo } from "../movimentoEstoqueTipo/movimento-estoque-tipo.enum";
import { UnidadeMedida } from "src/produto-tipo/unidadeMedida/unidade-medida.enum";
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Entity()
export class MovimentoEstoque {
        
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    @IsNotEmpty()
    tipo: MovimentoEstoqueTipo;

    @Column({type: "varchar"})
    @IsNotEmpty()
    unidadeMedida: UnidadeMedida;

    @Column({type: "timestamp"})
    data: Date;

    @ManyToOne(() => Produto, { eager: true })
    @IsNotEmpty()
    produto: Produto;

    @Column({type: "numeric"})
    quantidade: number;

    @ManyToOne(() => Usuario, { eager: true })
    @IsNotEmpty()
    usuarioAlt: Usuario;

}
