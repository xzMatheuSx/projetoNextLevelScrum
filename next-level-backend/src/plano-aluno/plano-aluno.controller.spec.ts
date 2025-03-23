import { Test, TestingModule } from '@nestjs/testing';
import { PlanoAlunoController } from './plano-aluno.controller';
import { PlanoAlunoService } from './plano-aluno.service';

describe('PlanoAlunoController', () => {
  let controller: PlanoAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanoAlunoController],
      providers: [PlanoAlunoService],
    }).compile();

    controller = module.get<PlanoAlunoController>(PlanoAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
