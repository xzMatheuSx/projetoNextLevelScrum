import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private readonly comprovanteRepository: Repository<ComprovantePagamento>,

    private dataSource: DataSource
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
    const aux = await this.mensalidadeRepository.find({ relations: ['aluno', 'plano'] });
  
    console.log(aux)
    const mensalidades = aux.map((mensalidade) => {
      return {
        aluno: mensalidade.aluno.nome,
        plano: mensalidade.plano.descricao,
        valorPago: mensalidade.valor,
        dataPagamento: mensalidade.dataPagamento,
        vencimento: mensalidade.vencimento,
        pago: mensalidade.pago,
      };
    });
  
    return { mensalidades };
  }

  async listarPorAluno(matricula: number) {
    const mensalidades = await this.mensalidadeRepository.find({
      where: { aluno: { matricula: matricula } },
      relations: ['aluno', 'plano'],
    });
  
    return mensalidades.map((mensalidade) => ({
      aluno: mensalidade.aluno.nome,
      plano: mensalidade.plano.descricao,
      valorPago: mensalidade.valor,
      dataPagamento: mensalidade.dataPagamento,
      vencimento: mensalidade.vencimento,
      pago: mensalidade.pago,
    }));
  }

  construirDataVencimento(data: string | Date): Date {
    if (typeof data === 'string') {
      return new Date(data + 'T00:00:00');
    }
    return data;
  }
  

  async listarVencidas() {
    const hoje = new Date();
  
    const mensalidades = await this.mensalidadeRepository.find({
      where: { pago: false },
      relations: ['aluno', 'plano'],
    });
  
    return mensalidades
    .filter((m) => {
        const vencimento = this.construirDataVencimento(m.vencimento);
        return vencimento instanceof Date && !isNaN(vencimento.getTime()) && vencimento < hoje;
      })      
      .map((m) => ({
        aluno: m.aluno.nome,
        plano: m.plano.descricao,
        valor: m.valor,
        vencimento: m.vencimento,
        pago: m.pago,
      }));
  }
  

  async listarAVencer() {
    const hoje = new Date();
  
    const mensalidades = await this.mensalidadeRepository.find({
      where: { pago: false },
      relations: ['aluno', 'plano'],
    });
  
    return mensalidades
    .filter((m) => {
        const vencimento = this.construirDataVencimento(m.vencimento);
        return vencimento instanceof Date && !isNaN(vencimento.getTime()) && vencimento >= hoje;
      })
      .map((m) => ({
        aluno: m.aluno.nome,
        plano: m.plano.descricao,
        valor: m.valor,
        vencimento: m.vencimento,
        pago: m.pago,
      }));
  }


  async gerarMensalidades(): Promise<void> {
    const query = `
      insert into mensalidades (vencimento, pago, valor, "alunoMatricula", "planoId")
      select  
        case when 
          date(a."diaVencimento" || '/' || extract(month from current_date) || '/' || extract(year from current_date)) < current_date 
        then 
          date(a."diaVencimento" || '/' || extract(month from current_date + 7) || '/' || extract(year from current_date)) 
        else 
          date(a."diaVencimento" || '/' || extract(month from current_date) || '/' || extract(year from current_date)) 
        end,
        false, 
        (
          case 
            when extract(day from current_date - pl."dataInicio") < 28 
            then p.valor / extract(day from current_date - pl."dataInicio")
            else p.valor 
          end
        )::numeric(15,2),
        a.matricula, 
        p.id
      from aluno a 
      join plano_aluno pl on (pl."alunoMatricula" = a.matricula) 
      join plano p on (p.id = pl."planoId")
      where pl."dataFinal" is null
        and a.ativo 
        and not exists(
          select 1 
          from mensalidades m 
          where m."alunoMatricula" = pl."alunoMatricula" 
          and date(vencimento) between current_date and current_date + 7
        )
        and (
          case when 
            date(a."diaVencimento" || '/' || extract(month from current_date) || '/' || extract(year from current_date)) < current_date 
          then 
            date(a."diaVencimento" || '/' || extract(month from current_date + 7) || '/' || extract(year from current_date)) 
          else 
            date(a."diaVencimento" || '/' || extract(month from current_date) || '/' || extract(year from current_date))
          end 
          between current_date and current_date + 7
        );
    `;

    await this.dataSource.query(query);
  }
}