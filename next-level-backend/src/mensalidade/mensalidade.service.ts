import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Plano } from 'src/plano/entities/plano.entity';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { ComprovantePagamento } from './entities/comprovante.entity';


@Injectable()
export class MensalidadeService {
  constructor(
    @InjectRepository(Mensalidade)
    private readonly mensalidadeRepository: Repository<Mensalidade>,

    @InjectRepository(Aluno)
    private readonly alunoRepository: Repository<Aluno>,

    @InjectRepository(Plano)
    private readonly planoRepository: Repository<Plano>,
    @InjectRepository(ComprovantePagamento)
    private readonly comprovanteRepository: Repository<ComprovantePagamento>
  ) {}

  async criarMensalidade(createMensalidadeDto: CreateMensalidadeDto) {
    const id = createMensalidadeDto.id;
    const matricula = createMensalidadeDto.matricula;
  
    const aluno = await this.alunoRepository.findOneBy({ matricula });
    const plano = await this.planoRepository.findOne({ where: { id } });
    const vencimento = createMensalidadeDto.vencimento; 
  
    if (!aluno || !plano) {
      throw new NotFoundException('Aluno ou plano não encontrado');
    }
  
    const novaMensalidade = this.mensalidadeRepository.create({
      aluno,
      plano,
      valor: plano.valor,
      vencimento,
      pago: createMensalidadeDto.pago,
      dataPagamento: createMensalidadeDto.dataPagamento,
    });
  
    const mensalidadeSalva = await this.mensalidadeRepository.save(novaMensalidade);
  
    const comprovante = this.comprovanteRepository.create({
      mensalidade: mensalidadeSalva,
      alunoNome: aluno.nome,
      planoNome: plano.descricao,
      valor: plano.valor,
      vencimento: mensalidadeSalva.vencimento,
      pago: mensalidadeSalva.pago,
      dataPagamento: mensalidadeSalva.dataPagamento,
    });
  
    await this.comprovanteRepository.save(comprovante);
  
    return {
      mensagem: `Mensalidade do aluno ${aluno.nome} paga com sucesso`,
      comprovante: {
        aluno: aluno.nome,
        plano: plano.descricao,
        valorPago: plano.valor,
        dataPagamento: mensalidadeSalva.dataPagamento,
        vencimento: mensalidadeSalva.vencimento,
        pago: mensalidadeSalva.pago,
      },
    };
  }
  

  async listarTodas() {
    return this.mensalidadeRepository.find({ relations: ['aluno', 'plano'] });
  }

  

}