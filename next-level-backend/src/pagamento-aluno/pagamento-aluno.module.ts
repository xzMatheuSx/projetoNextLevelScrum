import { Module } from '@nestjs/common';
import { PagamentoAlunoService } from './pagamento-aluno.service';
import { PagamentoAlunoController } from './pagamento-aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoAluno } from './entities/pagamento-aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagamentoAluno, Usuario, Aluno])], 
  controllers: [PagamentoAlunoController],
  providers: [PagamentoAlunoService],
})
export class PagamentoAlunoModule {}
