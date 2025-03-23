import { Module } from '@nestjs/common';
import { PlanoAlunoService } from './plano-aluno.service';
import { PlanoAlunoController } from './plano-aluno.controller';

@Module({
  controllers: [PlanoAlunoController],
  providers: [PlanoAlunoService],
})
export class PlanoAlunoModule {}
