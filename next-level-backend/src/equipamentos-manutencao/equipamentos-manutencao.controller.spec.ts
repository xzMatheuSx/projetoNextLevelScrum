import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentosManutencaoController } from './equipamentos-manutencao.controller';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';

describe('EquipamentosManutencaoController', () => {
  let controller: EquipamentosManutencaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipamentosManutencaoController],
      providers: [EquipamentosManutencaoService],
    }).compile();

    controller = module.get<EquipamentosManutencaoController>(EquipamentosManutencaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
