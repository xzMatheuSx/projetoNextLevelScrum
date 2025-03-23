import { Module } from '@nestjs/common';
import { EquipamentoTipoService } from './equipamento-tipo.service';
import { EquipamentoTipoController } from './equipamento-tipo.controller';

@Module({
  controllers: [EquipamentoTipoController],
  providers: [EquipamentoTipoService],
})
export class EquipamentoTipoModule {}
