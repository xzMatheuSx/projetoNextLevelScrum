import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoTipoController } from './produto-tipo.controller';
import { ProdutoTipoService } from './produto-tipo.service';

describe('ProdutoTipoController', () => {
  let controller: ProdutoTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoTipoController],
      providers: [ProdutoTipoService],
    }).compile();

    controller = module.get<ProdutoTipoController>(ProdutoTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
