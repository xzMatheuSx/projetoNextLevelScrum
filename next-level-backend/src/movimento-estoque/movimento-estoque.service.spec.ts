import { Test, TestingModule } from '@nestjs/testing';
import { MovimentoEstoqueService } from './movimento-estoque.service';

describe('MovimentoEstoqueService', () => {
  let service: MovimentoEstoqueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentoEstoqueService],
    }).compile();

    service = module.get<MovimentoEstoqueService>(MovimentoEstoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
