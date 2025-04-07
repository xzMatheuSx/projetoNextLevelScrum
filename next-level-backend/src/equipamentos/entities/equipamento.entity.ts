import { IsNotEmpty } from 'class-validator';
import { EquipamentoTipo } from 'src/equipamento-tipo/entities/equipamento-tipo.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('equipamentos')
export class Equipamento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  @IsNotEmpty()  dataCompra: string;


  @Column()
  status: string; 

  @ManyToOne(() => EquipamentoTipo, { eager: true })
  @JoinColumn()
  equipamentoTipo: EquipamentoTipo;
  
  @ManyToOne(() => Usuario, { eager: true })
  usuarioAlt: Usuario;
}