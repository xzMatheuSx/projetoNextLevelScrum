import { Test, TestingModule } from '@nestjs/testing';
import { VendaProdutoService } from './venda-produto.service';

describe('VendaProdutoService', () => {
  let service: VendaProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendaProdutoService],
    }).compile();

    service = module.get<VendaProdutoService>(VendaProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
