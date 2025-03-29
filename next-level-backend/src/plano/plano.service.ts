import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plano } from './entities/plano.entity';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PlanoService {
  constructor(
    @InjectRepository(Plano)
    private readonly planoRepository: Repository<Plano>,
  ) {}

  async create(createPlanoDto: CreatePlanoDto){
    try{
      const plano = this.planoRepository.create(createPlanoDto);
      await this.planoRepository.save(plano);
      return ('plano criado com sucesso')
    }catch(error){
      throw new Error ('Erro ao criar plano')
    }
    
  }

  async findAll(): Promise<Plano[]> {
    return await this.planoRepository.find();
  }

  async findOne(id: number){
    return await this.planoRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updatePlanoDto: UpdatePlanoDto){
    try{
      const plano = await this.planoRepository.findOne({ where: { id: id } });
      if(!plano){
        throw new Error('Plano não encontrado')
      }
      Object.assign(plano,updatePlanoDto)
      this.planoRepository.save(plano)
      return ('plano atualizado com sucesso')
    }catch(error){
      throw new Error('Erro ao atualizar plano')
    }
    
  }

  async remove(id: number){
    try{
      const plano = await this.planoRepository.findOne({ where: { id: id } });
      if(!plano){
        throw new Error('Plano não encontrado')
    }
  }catch(error){
    throw new Error('Erro ao remover plano')
  }
}

}