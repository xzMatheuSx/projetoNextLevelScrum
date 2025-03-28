import { Module } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { EquipamentosController } from './equipamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipamento } from './entities/equipamento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { EquipamentoTipo } from 'src/equipamento-tipo/entities/equipamento-tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamento, Usuario, EquipamentoTipo])],  
  controllers: [EquipamentosController],
  providers: [EquipamentosService],
})
export class EquipamentosModule {}
