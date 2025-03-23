import { Test, TestingModule } from '@nestjs/testing';
import { AlunoPresencaController } from './aluno-presenca.controller';
import { AlunoPresencaService } from './aluno-presenca.service';

describe('AlunoPresencaController', () => {
  let controller: AlunoPresencaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoPresencaController],
      providers: [AlunoPresencaService],
    }).compile();

    controller = module.get<AlunoPresencaController>(AlunoPresencaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
