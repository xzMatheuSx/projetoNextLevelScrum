import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentoTipoController } from './equipamento-tipo.controller';
import { EquipamentoTipoService } from './equipamento-tipo.service';

describe('EquipamentoTipoController', () => {
  let controller: EquipamentoTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentoTipoController],
      providers: [EquipamentoTipoService],
    }).compile();

    controller = module.get<EquipamentoTipoController>(EquipamentoTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
