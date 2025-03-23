import { Injectable } from '@nestjs/common';
import { CreateEquipamentosManutencaoDto } from './dto/create-equipamentos-manutencao.dto';
import { UpdateEquipamentosManutencaoDto } from './dto/update-equipamentos-manutencao.dto';

@Injectable()
export class EquipamentosManutencaoService {
  create(createEquipamentosManutencaoDto: CreateEquipamentosManutencaoDto) {
    return 'This action adds a new equipamentosManutencao';
  }

  findAll() {
    return `This action returns all equipamentosManutencao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipamentosManutencao`;
  }

  update(id: number, updateEquipamentosManutencaoDto: UpdateEquipamentosManutencaoDto) {
    return `This action updates a #${id} equipamentosManutencao`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipamentosManutencao`;
  }
}
