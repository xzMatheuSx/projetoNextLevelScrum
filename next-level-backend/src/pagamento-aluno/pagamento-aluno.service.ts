import { Injectable } from '@nestjs/common';
import { CreatePagamentoAlunoDto } from './dto/create-pagamento-aluno.dto';
import { UpdatePagamentoAlunoDto } from './dto/update-pagamento-aluno.dto';

@Injectable()
export class PagamentoAlunoService {
  create(createPagamentoAlunoDto: CreatePagamentoAlunoDto) {
    return 'This action adds a new pagamentoAluno';
  }

  findAll() {
    return `This action returns all pagamentoAluno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagamentoAluno`;
  }

  update(id: number, updatePagamentoAlunoDto: UpdatePagamentoAlunoDto) {
    return `This action updates a #${id} pagamentoAluno`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagamentoAluno`;
  }
}
