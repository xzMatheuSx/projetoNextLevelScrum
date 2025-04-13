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
  
    const mensalidade = await this.mensalidadeRepository.findOne({
        where: { id: id },
        relations: ['aluno', 'plano'],
      });

    if (!mensalidade) {
      throw new NotFoundException('Não foi possível encontrar a mensalidade informada!');
    }

    mensalidade.pago = true 
    mensalidade.dataPagamento = createMensalidadeDto.dataPagamento

    const mensalidadeSalva = await this.mensalidadeRepository.save(mensalidade);
  
    console.log(mensalidade)
    const comprovante = this.comprovanteRepository.create({
      mensalidade: mensalidadeSalva,
      alunoNome: mensalidade.aluno.nome,
      planoNome: mensalidade.plano.descricao,
      valor: mensalidade.valor,
      vencimento: mensalidadeSalva.vencimento,
      pago: mensalidadeSalva.pago,
      dataPagamento: mensalidadeSalva.dataPagamento,
    });
  
    await this.comprovanteRepository.save(comprovante);
  
    return {
      mensagem: `Mensalidade do aluno ${mensalidade.aluno.nome} paga com sucesso`,
      comprovante: {
        aluno: mensalidade.aluno.nome,
        plano: mensalidade.plano.descricao,
        valorPago: mensalidade.valor,
        dataPagamento: mensalidadeSalva.dataPagamento,
        vencimento: mensalidadeSalva.vencimento,
        pago: mensalidadeSalva.pago,
      },
    };
  }
  
  async listarTodas() {
    const aux = await this.mensalidadeRepository.find({ relations: ['aluno', 'plano'] });
  
    console.log(aux)
    return aux.map((mensalidade) => {
      return {
        id: mensalidade.id,
        aluno: mensalidade.aluno.nome,
        plano: mensalidade.plano.descricao,
        valor: mensalidade.valor,
        dataPagamento: mensalidade.dataPagamento,
        vencimento: mensalidade.vencimento,
        pago: mensalidade.pago,
      };
    });

  }

  async listarPorAluno(matricula: number) {
    const mensalidades = await this.mensalidadeRepository.find({
      where: { aluno: { matricula: matricula } },
      relations: ['aluno', 'plano'],
    });
  
    return mensalidades.map((mensalidade) => ({
        id: mensalidade.id,
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
        id: m.id,
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
        id: m.id,
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