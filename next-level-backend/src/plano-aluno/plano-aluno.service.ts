import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanoAluno } from './entities/plano-aluno.entity';
import { CreatePlanoAlunoDto } from './dto/create-plano-aluno.dto';
import { UpdatePlanoAlunoDto } from './dto/update-plano-aluno.dto';
import { Plano } from 'src/plano/entities/plano.entity';
import { Aluno } from 'src/alunos/entities/aluno.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PlanoAlunoService {
  constructor(
    @InjectRepository(PlanoAluno)
    private planoAlunoRepository: Repository<PlanoAluno>,

    @InjectRepository(Plano)
    private planoRepository: Repository<Plano>,

    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createPlanoAlunoDto: CreatePlanoAlunoDto) {
    const plano = await this.planoRepository.findOne({ where: { id: createPlanoAlunoDto.planoId } });
    if (!plano) {
      throw new NotFoundException(`Plano com ID ${createPlanoAlunoDto.planoId} não encontrado`);
    }

    const aluno = await this.alunoRepository.findOne({ where: { matricula: createPlanoAlunoDto.alunoMatricula } });
    if (!aluno) {
      throw new NotFoundException(`Aluno com matrícula ${createPlanoAlunoDto.alunoMatricula} não encontrado`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: createPlanoAlunoDto.usuarioAlt } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${createPlanoAlunoDto.usuarioAlt} não encontrado`);
    }

    const planoAluno = this.planoAlunoRepository.create({
      ...createPlanoAlunoDto,
      plano,
      aluno,
      usuarioAlt: usuario,
    });

    const savedPlanoAluno = await this.planoAlunoRepository.save(planoAluno);
    return `Plano do aluno com ID ${savedPlanoAluno.id} cadastrado com sucesso`;
  }

  async findAll(): Promise<PlanoAluno[]> {
    return await this.planoAlunoRepository.find();
  }

  async findOne(id: number): Promise<PlanoAluno> {
    const planoAluno = await this.planoAlunoRepository.findOne({ where: { id } });
    if (!planoAluno) {
      throw new NotFoundException(`PlanoAluno com ID ${id} não encontrado`);
    }
    return planoAluno;
  }

  async remove(id: number) {
    try {
      const result = await this.planoAlunoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`PlanoAluno com ID ${id} não encontrado`);
      }
      return `PlanoAluno com ID ${id} removido com sucesso`;
    } catch (error) {
      console.error(`Erro ao remover PlanoAluno ${id}:`, error);
      throw new InternalServerErrorException('Falha ao remover PlanoAluno');
    }
  }

  async update(id: number, updatePlanoAlunoDto: UpdatePlanoAlunoDto) {
    try {
      const planoAluno = await this.planoAlunoRepository.findOne({ where: { id } });
      if (!planoAluno) {
        throw new NotFoundException(`PlanoAluno com ID ${id} não encontrado`);
      }

      const plano = await this.planoRepository.findOne({ where: { id: updatePlanoAlunoDto.planoId } });
      if (!plano) {
        throw new NotFoundException(`Plano com ID ${updatePlanoAlunoDto.planoId} não encontrado`);
      }

      const aluno = await this.alunoRepository.findOne({ where: { matricula: updatePlanoAlunoDto.alunoMatricula } });
      if (!aluno) {
        throw new NotFoundException(`Aluno com matrícula ${updatePlanoAlunoDto.alunoMatricula} não encontrado`);
      }

      const usuario = await this.usuarioRepository.findOne({ where: { id: updatePlanoAlunoDto.usuarioAlt } });
      if (!usuario) {
        throw new NotFoundException(`Usuário com ID ${updatePlanoAlunoDto.usuarioAlt} não encontrado`);
      }

      Object.assign(planoAluno, {
        ...updatePlanoAlunoDto,
        plano,
        aluno,
        usuarioAlt: usuario,
      });

      await this.planoAlunoRepository.save(planoAluno);
      return 'Dados de PlanoAluno atualizados com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar PlanoAluno');
    }
  }
}
