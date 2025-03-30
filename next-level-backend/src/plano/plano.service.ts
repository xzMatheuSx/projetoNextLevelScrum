import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plano } from './entities/plano.entity';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ListaPlanoDTO } from './dto/lista-plano.dto';
import { RetornaPlanoDTO } from './dto/retorna-plano.dto';

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
      return ('Plano criado com sucesso')
    }catch(error){
      throw new Error ('Erro ao criar plano')
    }
    
  }

  async findAll(): Promise<ListaPlanoDTO[]> {
    let planos = await this.planoRepository.find();

    return planos.map((p: Plano) => new ListaPlanoDTO(
        p.id, p.descricao, p.qtdDiasSemana, 
        p.valor, p?.usuarioAlt?.usuario || ""
    ))
  }

  async findOne(id: number){
    let plano =  await this.planoRepository.findOne({ where: { id: id } });

    if (!plano) {
        throw new BadRequestException("Ocorreu um erro ao retornar o plano por id!")
    }

    return new RetornaPlanoDTO(plano?.id, plano?.descricao, plano?.qtdDiasSemana, plano?.valor)
  }

  async update(id: number, updatePlanoDto: UpdatePlanoDto){
    try{
      const plano = await this.planoRepository.findOne({ where: { id: id } });
      if(!plano){
        throw new Error('Plano não encontrado')
      }
      Object.assign(plano,updatePlanoDto)
      this.planoRepository.save(plano)
      return ('Plano atualizado com sucesso')
    }catch(error){
      throw new Error('Erro ao atualizar plano')
    }
    
  }

}