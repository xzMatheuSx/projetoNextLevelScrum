import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipamento } from './entities/equipamento.entity';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

@Injectable()
export class EquipamentosService {
  constructor(
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
  ) {}

  async create(createEquipamentoDto: CreateEquipamentoDto) {
    const equipamento = this.equipamentoRepository.create(createEquipamentoDto);
    return await this.equipamentoRepository.save(equipamento);
  }

  async findAll(): Promise<Equipamento[]> {
    return await this.equipamentoRepository.find();
  }

  async findOne(id: number): Promise<Equipamento> {
    const equipamento = await this.equipamentoRepository.findOne({ where: { id } });
    if (!equipamento) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }
    return equipamento;
  }

  async update(id: number, updateEquipamentoDto: UpdateEquipamentoDto) {
    const equipamento = await this.equipamentoRepository.findOne({ where: { id } });
    if (!equipamento) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }
    Object.assign(equipamento, updateEquipamentoDto);
    return await this.equipamentoRepository.save(equipamento);
  }

  async remove(id: number) {
    const result = await this.equipamentoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Equipamento com ID ${id} não encontrado`);
    }
    return `Equipamento com ID ${id} removido com sucesso`;
  }
}
