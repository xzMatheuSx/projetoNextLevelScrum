import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentoTipoService } from './equipamento-tipo.service';

describe('EquipamentoTipoService', () => {
  let service: EquipamentoTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentoTipoService],
    }).compile();

    service = module.get<EquipamentoTipoService>(EquipamentoTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
