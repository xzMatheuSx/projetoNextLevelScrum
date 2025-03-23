import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoTipoService } from './produto-tipo.service';

describe('ProdutoTipoService', () => {
  let service: ProdutoTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoTipoService],
    }).compile();

    service = module.get<ProdutoTipoService>(ProdutoTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
