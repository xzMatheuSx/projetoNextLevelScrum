import { Injectable } from '@nestjs/common';
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';

@Injectable()
export class AlunoPresencaService {
  create(createAlunoPresencaDto: CreateAlunoPresencaDto) {
    return 'This action adds a new alunoPresenca';
  }

  findAll() {
    return `This action returns all alunoPresenca`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alunoPresenca`;
  }

  update(id: number, updateAlunoPresencaDto: UpdateAlunoPresencaDto) {
    return `This action updates a #${id} alunoPresenca`;
  }

  remove(id: number) {
    return `This action removes a #${id} alunoPresenca`;
  }
}
