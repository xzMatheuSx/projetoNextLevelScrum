import { Module } from '@nestjs/common';
import { AlunoPresencaService } from './aluno-presenca.service';
import { AlunoPresencaController } from './aluno-presenca.controller';

@Module({
  controllers: [AlunoPresencaController],
  providers: [AlunoPresencaService],
})
export class AlunoPresencaModule {}
