import { Module } from '@nestjs/common';
import { EquipamentoTipoService } from './equipamento-tipo.service';
import { EquipamentoTipoController } from './equipamento-tipo.controller';
import { EquipamentoTipo } from './entities/equipamento-tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EquipamentoTipo])], 
  controllers: [EquipamentoTipoController],
  providers: [EquipamentoTipoService],
})
export class EquipamentoTipoModule {}
