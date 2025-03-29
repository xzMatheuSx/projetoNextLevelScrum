import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlunoPresenca } from './entities/aluno-presenca.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity'; 
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';

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


    const presenca = this.alunoPresencaRepository.create({
      ...createAlunoPresencaDto,  
      alunoMatricula: aluno, 
    });

    return await this.alunoPresencaRepository.save(presenca);
  }

  async findAll(): Promise<AlunoPresenca[]> {
    return await this.alunoPresencaRepository.find();
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
