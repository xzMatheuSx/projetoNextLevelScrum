import { Test, TestingModule } from '@nestjs/testing';
import { PlanoAlunoService } from './plano-aluno.service';

describe('PlanoAlunoService', () => {
  let service: PlanoAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanoAlunoService],
    }).compile();

    service = module.get<PlanoAlunoService>(PlanoAlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
