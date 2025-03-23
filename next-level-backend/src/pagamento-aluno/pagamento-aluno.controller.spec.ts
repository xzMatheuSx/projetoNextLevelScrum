import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoAlunoController } from './pagamento-aluno.controller';
import { PagamentoAlunoService } from './pagamento-aluno.service';

describe('PagamentoAlunoController', () => {
  let controller: PagamentoAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoAlunoController],
      providers: [PagamentoAlunoService],
    }).compile();

    controller = module.get<PagamentoAlunoController>(PagamentoAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
