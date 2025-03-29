import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipamentoTipo } from './entities/equipamento-tipo.entity';
import { CreateEquipamentoTipoDto } from './dto/create-equipamento-tipo.dto';
import { UpdateEquipamentoTipoDto } from './dto/update-equipamento-tipo.dto';

@Injectable()
export class EquipamentoTipoService {
  constructor(
    @InjectRepository(EquipamentoTipo)
    private equipamentoTipoRepository: Repository<EquipamentoTipo>,
  ) {}

  async create(createEquipamentoTipoDto: CreateEquipamentoTipoDto) {
    const tipo = this.equipamentoTipoRepository.create(createEquipamentoTipoDto);
    return await this.equipamentoTipoRepository.save(tipo);
  }

  async findAll(): Promise<EquipamentoTipo[]> {
    return await this.equipamentoTipoRepository.find();
  }

  async findOne(id: number): Promise<EquipamentoTipo> {
    const tipo = await this.equipamentoTipoRepository.findOne({ where: { id } });
    if (!tipo) {
      throw new NotFoundException(`Tipo de equipamento com ID ${id} não encontrado`);
    }
    return tipo;
  }

  async update(id: number, updateEquipamentoTipoDto: UpdateEquipamentoTipoDto) {
    const tipo = await this.equipamentoTipoRepository.findOne({ where: { id } });
    if (!tipo) {
      throw new NotFoundException(`Tipo de equipamento com ID ${id} não encontrado`);
    }
    Object.assign(tipo, updateEquipamentoTipoDto);
    return await this.equipamentoTipoRepository.save(tipo);
  }

  async remove(id: number) {
    const result = await this.equipamentoTipoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de equipamento com ID ${id} não encontrado`);
    }
    return `Tipo de equipamento com ID ${id} removido com sucesso`;
  }
}
