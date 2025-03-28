import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { Aluno } from './entities/aluno.entity';  
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno, Usuario])],  
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
