import { Test, TestingModule } from '@nestjs/testing';
import { EquipamentoService } from './equipamento.service';

describe('EquipamentoService', () => {
  let service: EquipamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipamentoService],
    }).compile();

    service = module.get<EquipamentoService>(EquipamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
