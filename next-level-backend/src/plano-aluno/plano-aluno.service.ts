import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanoAluno } from './entities/plano-aluno.entity';
import { CreatePlanoAlunoDto } from './dto/create-plano-aluno.dto';
import { UpdatePlanoAlunoDto } from './dto/update-plano-aluno.dto';

@Injectable()
export class PlanoAlunoService {
  create(createPlanoAlunoDto: CreatePlanoAlunoDto) {
    return 'This action adds a new planoAluno';
  }

  findAll() {
    return `This action returns all planoAluno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planoAluno`;
  }

  update(id: number, updatePlanoAlunoDto: UpdatePlanoAlunoDto) {
    return `This action updates a #${id} planoAluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} planoAluno`;
  }
}
