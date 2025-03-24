import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto){
    const aluno = this.alunosRepository.create(createAlunoDto);
    const aux = await this.alunosRepository.save(aluno);
    return (`aluno ${aux.nome} cadastrado com sucesso`)
  }

  async findAll(): Promise<Aluno[]> {
    return await this.alunosRepository.find();
  }

  async findOne(matricula: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOne({ where: { matricula } });
    if (!aluno) {
      throw new NotFoundException(`Aluno com matrícula ${matricula} não encontrado`);
    }
    return aluno;
  }}
