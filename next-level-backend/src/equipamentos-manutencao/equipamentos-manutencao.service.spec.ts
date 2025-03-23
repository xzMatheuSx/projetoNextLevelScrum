import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';

describe('EquipamentosManutencaoService', () => {
  let service: EquipamentosManutencaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentosManutencaoService],
    }).compile();

    service = module.get<EquipamentosManutencaoService>(EquipamentosManutencaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
