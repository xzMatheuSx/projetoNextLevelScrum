import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { AlunoPresenca } from './entities/aluno-presenca.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity'; 
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';
import { RetonaAlunoPresencaDTO } from './dto/retorna-aluno-presenca.dto';

@Injectable()
export class AlunoPresencaService {
  constructor(
    @InjectRepository(AlunoPresenca)
    private alunoPresencaRepository: Repository<AlunoPresenca>,
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoPresencaDto: CreateAlunoPresencaDto) {
    const aluno = await this.alunoRepository.findOne({
      where: { matricula: createAlunoPresencaDto.alunoMatricula }, 
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com matrícula ${createAlunoPresencaDto.alunoMatricula} não encontrado`);
    }

    if (aluno.ativo == false) {
        throw new NotFoundException("O aluno informado não está ativo! Não será possível registrar a presença!")
    }


    const presenca = this.alunoPresencaRepository.create({
      ...createAlunoPresencaDto,  
      alunoMatricula: aluno, 
    });

    let al = await this.alunoPresencaRepository.save(presenca);

    return new RetonaAlunoPresencaDTO(
        al.id, al.momento, al.alunoMatricula.matricula,
        al.alunoMatricula.nome, al.usuarioAlt?.nome || ""
    )
  }

  async findAll(): Promise<RetonaAlunoPresencaDTO[]> {
    return (await this.alunoPresencaRepository.find()).map((al: AlunoPresenca) => 
        new RetonaAlunoPresencaDTO(
            al.id, al.momento, al.alunoMatricula.matricula,
            al.alunoMatricula.nome, al.usuarioAlt?.nome || ""
        )
    )
  }

  async pesquisarPresencaAluno(
    dataIni: Date, dataFim: Date, nome: string
  ){
    console.log(dataFim, dataIni, nome)
    let presenca = await this.alunoPresencaRepository
    .createQueryBuilder('alunoPresenca')
    .innerJoinAndSelect('alunoPresenca.alunoMatricula', 'aluno')
    .where('LOWER(aluno.nome) LIKE LOWER(:aluno)', { aluno: `%${nome}%` }) 
    .andWhere('DATE(alunoPresenca.momento) BETWEEN DATE(:startDate) AND DATE(:endDate)', { 
      startDate: dataIni, 
      endDate: dataFim 
    }) 
    .getMany()

    return presenca.map((al: AlunoPresenca) => 
        new RetonaAlunoPresencaDTO(
            al.id, al.momento, al.alunoMatricula.matricula,
            al.alunoMatricula.nome, al.usuarioAlt?.nome || ""
        )
    )
  }

  async findOne(id: number): Promise<AlunoPresenca> {
    const presenca = await this.alunoPresencaRepository.findOne({ where: { id } });
    if (!presenca) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }
    return presenca;
  }

  async update(id: number, updateAlunoPresencaDto: UpdateAlunoPresencaDto) {
    const presenca = await this.alunoPresencaRepository.findOne({ where: { id } });
    if (!presenca) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }

      if (presenca.alunoMatricula.ativo == false) {
          throw new NotFoundException("O aluno informado não está ativo! Não será possível registrar a presença!")
      }
  
    Object.assign(presenca, updateAlunoPresencaDto);
    return await this.alunoPresencaRepository.save(presenca);
  }

  async remove(id: number) {
    const result = await this.alunoPresencaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Presença de aluno com ID ${id} não encontrada`);
    }
    return `Presença de aluno com ID ${id} removida com sucesso`;
  }
}
