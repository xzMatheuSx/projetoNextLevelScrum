import { Module } from '@nestjs/common';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';
import { EquipamentosManutencaoController } from './equipamentos-manutencao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentosManutencao } from './entities/equipamentos-manutencao.entity';
import { Equipamento } from 'src/equipamentos/entities/equipamento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipamentosManutencao, Equipamento, Usuario])], 
  controllers: [EquipamentosManutencaoController],
  providers: [EquipamentosManutencaoService],
})
export class EquipamentosManutencaoModule {}
