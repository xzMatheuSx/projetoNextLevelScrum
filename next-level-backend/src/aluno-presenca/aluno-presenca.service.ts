import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Like, Repository } from 'typeorm';
import { Presenca } from './entities/aluno-presenca.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';
import { RetonaAlunoPresencaDTO } from './dto/retorna-aluno-presenca.dto';
import { SaidaDTO } from './dto/create-aluno-saida.dto';
import { Plano } from 'src/plano/entities/plano.entity';

@Injectable()
export class AlunoPresencaService {
  constructor(
    @InjectRepository(Presenca)
    private presencaRepository: Repository<Presenca>,

    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

  ) {}


  async checkIn(dto: CreateAlunoPresencaDto) {
  
    const aluno = await this.alunoRepository.findOne({
      where: { matricula: dto.alunoMatricula },
      relations: ['mensalidades', 'mensalidades.plano'], 
    });
  
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
  
    
    const ultimaMensalidade = aluno.mensalidades?.sort((a, b) => {
      return new Date(b.vencimento).getTime() - new Date(a.vencimento).getTime();
    })[0]; 
  
    if (!ultimaMensalidade || !ultimaMensalidade.plano) {
      //throw new NotFoundException('Plano não encontrado na última mensalidade');
    }
  
    const plano = ultimaMensalidade.plano;
  
    
    const limiteSemana = Number(plano.qtdDiasSemana);
  
    if (isNaN(limiteSemana)) {
      //throw new BadRequestException('Quantidade de dias por semana inválida no plano');
    }
  
    
    const hoje = new Date();
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioDaSemana.setHours(0, 0, 0, 0);
  
    const fimDaSemana = new Date(hoje);
    fimDaSemana.setDate(hoje.getDate() + (6 - hoje.getDay()));
    fimDaSemana.setHours(23, 59, 59, 999);
  
  
    const presencasDaSemana = await this.presencaRepository.count({
      where: {
        aluno,
        entrada: Between(inicioDaSemana, fimDaSemana), 
      },
    });
  
    if (presencasDaSemana >= limiteSemana) {
      throw new BadRequestException(
        `Limite de ${limiteSemana} check-ins por semana atingido`,
      );
    }
  
  
    const aberta = await this.presencaRepository.findOne({
      where: { aluno, saida: IsNull() },
    });
  
    if (aberta) {
      throw new BadRequestException('Já existe um check-in aberto.');
    }
  
  
    const presenca = this.presencaRepository.create({
      aluno,
      entrada: new Date(),
    });
  
    const aux = await this.presencaRepository.save(presenca);
  
    return `Entrada registrada com sucesso para ${aux.aluno.nome}`;
  }

  

  async checkOut(createAlunoSaidaDto: SaidaDTO) {
    const { alunoMatricula } = createAlunoSaidaDto;
  

    const aluno = await this.alunoRepository.findOneBy({ matricula: alunoMatricula });
  
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }
  
    const presenca = await this.presencaRepository.findOne({
      where: { aluno, saida: IsNull() },
    });
  
    if (!presenca) {
      throw new NotFoundException('Nenhuma presença em aberto encontrada.');
    }
  

    const saida = new Date();
    const duracaoMs = saida.getTime() - presenca.entrada.getTime();
    const duracaoMin = Math.floor(duracaoMs / 60000);
  
    presenca.saida = saida;
    presenca.duracao = duracaoMin;
  
    const saved = await this.presencaRepository.save(presenca);

return {
  entrada: saved.entrada,
  saida: saved.saida,
  duracao: saved.duracao,
};
  }


  async findByMatricula(createAlunoPresencaDto: CreateAlunoPresencaDto) {
    const presencas = await this.presencaRepository.find({
      where: {
        aluno: {
          matricula: createAlunoPresencaDto.alunoMatricula,
        },
      },
      order: { entrada: 'DESC' },
    });
  
    if (!presencas || presencas.length === 0) {
      throw new NotFoundException('Nenhuma presença encontrada para o aluno informado.');
    }
  
    return presencas.map((presenca) => ({
      aluno: {
        matricula: presenca.aluno.matricula,
        nome: presenca.aluno.nome,
      },
      entrada: presenca.entrada,
      saida: presenca.saida,
      duracao: presenca.duracao,
    }));
  }

  async findAll() {
    const presencas = await this.presencaRepository.find({ relations: ['aluno'] });
  
    /*return presencas.map((presenca) => ({
      aluno: {
        matricula: presenca.aluno.matricula,
        nome: presenca.aluno.nome,
      },
      entrada: presenca.entrada,
      saida: presenca.saida,
      duracao: presenca.duracao,
    }));*/
    return presencas.map((presenca) => ({
        aluno: presenca.aluno.matricula,
        nome: presenca.aluno.nome,
        entrada: this.retornaDataFormatada(presenca.entrada),
        saida: presenca.saida ? this.retornaDataFormatada(presenca.saida) : "",
        duracao: this.retornaDuracaoMomentoAtual(presenca.entrada, presenca.saida),
      }));
  }

  async retornaTodosAlunosPresentes() {
    const presencas = await this.presencaRepository
    .createQueryBuilder('presenca')
    .leftJoinAndSelect('presenca.aluno', 'aluno')
    .where('presenca.saida IS NULL')
    .orderBy('presenca.entrada')
    .getMany();

      return presencas.map((presenca) => ({
      aluno: presenca.aluno.matricula,
      nome: presenca.aluno.nome,
      entrada: this.retornaDataFormatada(presenca.entrada),
      saida: '',
      duracao: this.retornaDuracaoMomentoAtual(presenca.entrada, undefined),
    }));
  }

  async retornaTodosPresentesDia(){
    const hoje = new Date();

    const inicioDoDia = new Date(hoje);
    inicioDoDia.setUTCHours(0, 0, 0, 0);
  
    const fimDoDia = new Date(hoje);
    fimDoDia.setUTCHours(23, 59, 59, 999);
  
    const presencas = await this.presencaRepository
      .createQueryBuilder('presenca')
      .leftJoinAndSelect('presenca.aluno', 'aluno')
      .where('date(presenca.entrada) = date(:inicio)', {
        inicio: inicioDoDia
      })
      .orderBy('presenca.entrada')
      .getMany();
  
    return presencas.map((presenca) => ({
      aluno: presenca.aluno.matricula,
      nome: presenca.aluno.nome,
      entrada: this.retornaDataFormatada(presenca.entrada),
      saida: presenca.saida ? this.retornaDataFormatada(presenca.saida) : "",
      duracao: this.retornaDuracaoMomentoAtual(presenca.entrada, presenca.saida),
    }));
  }


  retornaDuracaoMomentoAtual(dataEntrada: Date, saida: Date | undefined): string {
    let agora = new Date();
    if (saida) {
        agora = saida
    }
 
    const diffMs = agora.getTime() - dataEntrada.getTime();
  
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    const horas = String(diffHoras).padStart(2, '0');
    const minutos = String(diffMinutos).padStart(2, '0');
  
    return `${horas}:${minutos}`;
  }

  retornaDataFormatada(data: Date){
    const date = new Date(data);

    const formatted = date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
    timeZone: 'America/Sao_Paulo' 
    });

    const cleaned = formatted.replace(',', '');

    return cleaned
  }
  }


































































/*
  async create(createAlunoPresencaDto: CreateAlunoPresencaDto) {
    const aluno = await this.alunoRepository.findOne({
      where: { matricula: createAlunoPresencaDto.alunoMatricula },
    });

    if (!aluno) {
      throw new NotFoundException(
        `Aluno com matrícula ${createAlunoPresencaDto.alunoMatricula} não encontrado`,
      );
    }

    if (!aluno.ativo) {
      throw new NotFoundException(
        'O aluno informado não está ativo! Não será possível registrar a presença!',
      );
    }

    const presenca = this.PresencaRepository.create({
      ...createAlunoPresencaDto,
      aluno,
    });

    const al = await this.PresencaRepository.save(presenca);

    return new RetonaAlunoPresencaDTO(
      al.id,
      al.entrada,
      al.aluno.matricula,
      al.aluno.nome,
      '',
    );
  }

  async findAll(): Promise<RetonaAlunoPresencaDTO[]> {
    const list = await this.PresencaRepository.find({
      relations: ['aluno'],
    });

    return list.map((al: Presenca) => 
      new RetonaAlunoPresencaDTO(
        al.id,
        al.entrada,
        al.aluno.matricula,
        al.aluno.nome,
        '',
      ),
    );
  }

  async pesquisarPresencaAluno(dataIni: Date, dataFim: Date, nome: string) {
    const presenca = await this.PresencaRepository
      .createQueryBuilder('alunoPresenca')
      .innerJoinAndSelect('alunoPresenca.aluno', 'aluno')
      .where('LOWER(aluno.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })
      .andWhere('DATE(alunoPresenca.entrada) BETWEEN DATE(:startDate) AND DATE(:endDate)', {
        startDate: dataIni,
        endDate: dataFim,
      })
      .getMany();

    return presenca.map((al: Presenca) =>
      new RetonaAlunoPresencaDTO(
        al.id,
        al.entrada,
        al.aluno.matricula,
        al.aluno.nome,
        '',
      ),
    );
  }

  async findOne(id: number): Promise<Presenca> {
    const presenca = await this.PresencaRepository.findOne({
      where: { id },
      relations: ['aluno'],
    });

    if (!presenca) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }

    return presenca;
  }

  async update(id: number, updateAlunoPresencaDto: UpdateAlunoPresencaDto) {
    const presenca = await this.PresencaRepository.findOne({
      where: { id },
      relations: ['aluno'],
    });

    if (!presenca) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }

    if (!presenca.aluno.ativo) {
      throw new NotFoundException('O aluno informado não está ativo! Não será possível atualizar a presença!');
    }

    Object.assign(presenca, updateAlunoPresencaDto);
    return this.PresencaRepository.save(presenca);
  }

  async remove(id: number) {
    const result = await this.PresencaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }

    return `Presença de aluno com ID ${id} removida com sucesso`;
  }
}
*/