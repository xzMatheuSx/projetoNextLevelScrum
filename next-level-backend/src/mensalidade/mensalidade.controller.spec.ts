import { Test, TestingModule } from '@nestjs/testing';
import { MensalidadeController } from './mensalidade.controller';
import { MensalidadeService } from './mensalidade.service';

describe('MensalidadeController', () => {
  let controller: MensalidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensalidadeController],
      providers: [MensalidadeService],
    }).compile();

    controller = module.get<MensalidadeController>(MensalidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
