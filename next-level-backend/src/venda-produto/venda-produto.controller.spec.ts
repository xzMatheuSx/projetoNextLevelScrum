import { Test, TestingModule } from '@nestjs/testing';
import { VendaProdutoController } from './venda-produto.controller';
import { VendaProdutoService } from './venda-produto.service';

describe('VendaProdutoController', () => {
  let controller: VendaProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendaProdutoController],
      providers: [VendaProdutoService],
    }).compile();

    controller = module.get<VendaProdutoController>(VendaProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
