import { Module } from '@nestjs/common';
import { PlanoAlunoService } from './plano-aluno.service';
import { PlanoAlunoController } from './plano-aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoAluno } from './entities/plano-aluno.entity';
import { Plano } from 'src/plano/entities/plano.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
     imports: [TypeOrmModule.forFeature([PlanoAluno, Plano, Aluno, Usuario])], 
  controllers: [PlanoAlunoController],
  providers: [PlanoAlunoService],
})
export class PlanoAlunoModule {}
