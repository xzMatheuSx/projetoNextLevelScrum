import { Module } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { MensalidadeController } from './mensalidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { Plano } from '../plano/entities/plano.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { ComprovantePagamento } from './entities/comprovante.entity';
import { CadastroMensalidades } from './cadastro-mensalidades.schedules';

@Module({
  imports: [TypeOrmModule.forFeature([Mensalidade, Aluno, Plano,ComprovantePagamento])],
  controllers: [MensalidadeController],
  providers: [MensalidadeService, CadastroMensalidades],
})
export class MensalidadeModule {}