import { Test, TestingModule } from '@nestjs/testing';
import { MovimentoEstoqueController } from './movimento-estoque.controller';
import { MovimentoEstoqueService } from './movimento-estoque.service';

describe('MovimentoEstoqueController', () => {
  let controller: MovimentoEstoqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentoEstoqueController],
      providers: [MovimentoEstoqueService],
    }).compile();

    controller = module.get<MovimentoEstoqueController>(MovimentoEstoqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
