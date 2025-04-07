import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipamento } from './entities/equipamento.entity';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EquipamentosService {
  constructor(
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
  ) {}

  async create(createEquipamentoDto: CreateEquipamentoDto) {
    const equipamento = this.equipamentoRepository.create(createEquipamentoDto);
    const savedEquipamento = await this.equipamentoRepository.save(equipamento);
  

    const equipamentoComRelations = await this.equipamentoRepository.findOne({
      where: { id: savedEquipamento.id },
      relations: ['equipamentoTipo', 'usuarioAlt'],
    });
  
    return {
      retorno: {
        id: equipamentoComRelations?.id,
        tipo: equipamentoComRelations?.equipamentoTipo?.descricao ,
        user: equipamentoComRelations?.usuarioAlt?.nome,
        dataManutencao: equipamentoComRelations?.dataManutencao,
        dataCompra: equipamentoComRelations?.dataCompra,
        status: equipamentoComRelations?.status,
      },
    };
  }

  async findAll() {
    const equipamentos = await this.equipamentoRepository.find({
      relations: ['equipamentoTipo', 'usuarioAlt'],
    });
  
    return {
      retorno: equipamentos.map(equip => ({
        id: equip.id,
        tipo: equip.equipamentoTipo?.descricao || null,
        user: equip.usuarioAlt?.nome || null,
        dataManutencao: equip.dataManutencao,
        dataCompra: equip.dataCompra,
        status: equip.status,
      })),
    };
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
