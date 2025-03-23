import { Module } from '@nestjs/common';
import { PagamentoAlunoService } from './pagamento-aluno.service';
import { PagamentoAlunoController } from './pagamento-aluno.controller';

@Module({
  controllers: [PagamentoAlunoController],
  providers: [PagamentoAlunoService],
})
export class PagamentoAlunoModule {}
