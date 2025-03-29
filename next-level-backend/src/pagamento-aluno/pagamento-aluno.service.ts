import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagamentoAluno } from './entities/pagamento-aluno.entity';
import { CreatePagamentoAlunoDto } from './dto/create-pagamento-aluno.dto';
import { Aluno } from 'src/alunos/entities/aluno.entity';  
import { Usuario } from 'src/usuarios/entities/usuario.entity';  
import { UpdatePagamentoAlunoDto } from './dto/update-pagamento-aluno.dto';

@Injectable()
export class PagamentoAlunoService {
  constructor(
    @InjectRepository(PagamentoAluno)
    private pagamentoAlunoRepository: Repository<PagamentoAluno>,

    @InjectRepository(Aluno)  
    private alunoRepository: Repository<Aluno>,

    @InjectRepository(Usuario)  
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createPagamentoAlunoDto: CreatePagamentoAlunoDto) {
    const aluno = await this.alunoRepository.findOneBy({ matricula: createPagamentoAlunoDto.alunoId });
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${createPagamentoAlunoDto.alunoId} não encontrado`);
    }


    const usuario = await this.usuarioRepository.findOneBy({ id: createPagamentoAlunoDto.usuarioAlt });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${createPagamentoAlunoDto.usuarioAlt} não encontrado`);
    }


    const pagamento = this.pagamentoAlunoRepository.create({
      ...createPagamentoAlunoDto,
      aluno,  
      usuarioAlt: usuario,  
    });

    return await this.pagamentoAlunoRepository.save(pagamento);
  }

  async findAll(): Promise<PagamentoAluno[]> {
    return await this.pagamentoAlunoRepository.find();
  }

  async findOne(id: number): Promise<PagamentoAluno> {
    const pagamento = await this.pagamentoAlunoRepository.findOneBy({ id });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento de aluno com ID ${id} não encontrado`);
    }
    return pagamento;
  }

  async update(id: number, updatePagamentoAlunoDto: UpdatePagamentoAlunoDto) {
    const pagamento = await this.pagamentoAlunoRepository.findOneBy({ id });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento de aluno com ID ${id} não encontrado`);
    }
    Object.assign(pagamento, updatePagamentoAlunoDto);
    return await this.pagamentoAlunoRepository.save(pagamento);
  }

  async remove(id: number) {
    const result = await this.pagamentoAlunoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pagamento de aluno com ID ${id} não encontrado`);
    }
    return `Pagamento de aluno com ID ${id} removido com sucesso`;
  }
}
