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
    private readonly planoAlunoRepository: Repository<PlanoAluno>,
    @InjectRepository(Plano) // Repositório correto para Plano
    private readonly planoRepository: Repository<Plano>
  ) {}

  async create(createPlanoAlunoDto: CreatePlanoAlunoDto) {
    const novoPlanoAluno = this.planoAlunoRepository.create({
      plano: { id: createPlanoAlunoDto.plano } as Plano,
      aluno: { matricula: createPlanoAlunoDto.aluno } as Aluno,
      dataInicio: createPlanoAlunoDto.dataInicio,
      dataFinal: createPlanoAlunoDto.dataFinal,
      usuarioAlt: { id: createPlanoAlunoDto.usuarioAlt } as Usuario,
    });
  
    return await this.planoAlunoRepository.save(novoPlanoAluno);
  }

  async findAll(): Promise<any[]> {
    const results = await this.planoAlunoRepository.find({
      relations: ['plano', 'aluno', 'usuarioAlt'],
    });
  
    return results.map(pa => ({
      nomeAluno: pa.aluno.nome,
      dataCriacao: pa.dataInicio, 
      usuarioCadastro: pa.usuarioAlt ? pa.usuarioAlt.nome : null,
    }));
  }

  async findOne(alunoId: number): Promise<any> {
    const planoAluno = await this.planoAlunoRepository.findOne({ 
      where: { aluno: { matricula: alunoId } }, 
      relations: ['plano', 'aluno', 'usuarioAlt'] 
    });
  
    if (!planoAluno) {
      throw new NotFoundException(`Plano do aluno com ID ${alunoId} não encontrado`);
    }
  
    return {
      nomeAluno: planoAluno.aluno.nome, 
      plano: planoAluno.plano.descricao, 
      dataCriacao: planoAluno.dataInicio, 
      usuarioCadastro: planoAluno.usuarioAlt ? planoAluno.usuarioAlt.nome : null, 
    };
  }
  async update(id: number, updatePlanoAlunoDto: UpdatePlanoAlunoDto): Promise<PlanoAluno> {

    const planoAluno = await this.planoAlunoRepository.findOne({ 
        where: { id },
        relations: ['plano', 'aluno'] 
    });

    if (!planoAluno) {
        throw new NotFoundException(`PlanoAluno com ID ${id} não encontrado`);
    }

   
    if (updatePlanoAlunoDto.plano) {
      
        const plano = await this.planoRepository.findOne({ 
            where: { id: updatePlanoAlunoDto.plano }
        });
        
        if (!plano) {
            throw new NotFoundException(`Plano com ID ${updatePlanoAlunoDto.plano} não encontrado`);
        }

        planoAluno.plano = plano;
    }

    
    if (updatePlanoAlunoDto.dataInicio) {
        planoAluno.dataInicio = updatePlanoAlunoDto.dataInicio;
    }

    if (updatePlanoAlunoDto.dataFinal) {
        planoAluno.dataFinal = updatePlanoAlunoDto.dataFinal;
    }

  
    try {
        return await this.planoAlunoRepository.save(planoAluno);
    } catch (error) {
        throw new InternalServerErrorException('Erro ao atualizar o PlanoAluno');
    }
}
  
  async remove(id: number): Promise<any> {
    const planoAluno = await this.planoAlunoRepository.findOne({ where: { id } });
  
    if (!planoAluno) {
      throw new NotFoundException(`PlanoAluno com ID ${id} não encontrado`);
    }
  
    await this.planoAlunoRepository.delete(id);
    return { message: `PlanoAluno com ID ${id} removido com sucesso!` };
  }


}
