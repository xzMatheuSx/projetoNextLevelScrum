import { Module } from '@nestjs/common';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';
import { EquipamentosManutencaoController } from './equipamentos-manutencao.controller';

@Module({
  controllers: [EquipamentosManutencaoController],
  providers: [EquipamentosManutencaoService],
})
export class EquipamentosManutencaoModule {}
