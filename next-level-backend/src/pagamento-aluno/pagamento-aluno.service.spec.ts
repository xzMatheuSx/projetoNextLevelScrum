import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoAlunoService } from './pagamento-aluno.service';

describe('PagamentoAlunoService', () => {
  let service: PagamentoAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagamentoAlunoService],
    }).compile();

    service = module.get<PagamentoAlunoService>(PagamentoAlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
