import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  }

  async remove(matricula: number){
    try {
      const result = await this.alunosRepository.delete(matricula);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Aluno com a matricula ${matricula} não encontrado`);
      }
      
      console.log(`Aluno com a matricula ${matricula} removido com sucesso`);
      return (`Aluno com a matricula ${matricula} removido com sucesso`)
    } catch (error) {
      console.error(`Erro ao remover aluno ${matricula}:`, error);
      throw new InternalServerErrorException('Falha ao remover aluno');
    }
  }

  async update(matricula: number, updateAlunoDto: UpdateAlunoDto){
    try{
      const aluno = await this.alunosRepository.findOne({ where: { matricula } });
      if (!aluno) {
        throw new NotFoundException(`Aluno com ID ${matricula} não encontrado`);
      }
      Object.assign(aluno, updateAlunoDto);
  
      this.alunosRepository.save(aluno);
      return ('dados atualizados com sucesso')
    }catch(error){
      throw new InternalServerErrorException('Falha ao atualizar aluno')
    }
    
  }


}
