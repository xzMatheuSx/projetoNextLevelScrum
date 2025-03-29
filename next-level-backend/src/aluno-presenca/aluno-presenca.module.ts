import { Module } from '@nestjs/common';
import { AlunoPresencaService } from './aluno-presenca.service';
import { AlunoPresencaController } from './aluno-presenca.controller';
import { AlunoPresenca } from './entities/aluno-presenca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoPresenca, Aluno, Usuario])], 
  controllers: [AlunoPresencaController],
  providers: [AlunoPresencaService],
})
export class AlunoPresencaModule {}
