import { Test, TestingModule } from '@nestjs/testing';
import { AlunoPresencaService } from './aluno-presenca.service';

describe('AlunoPresencaService', () => {
  let service: AlunoPresencaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoPresencaService],
    }).compile();

    service = module.get<AlunoPresencaService>(AlunoPresencaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
