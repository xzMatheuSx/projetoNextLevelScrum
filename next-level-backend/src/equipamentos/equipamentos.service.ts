import { Injectable } from '@nestjs/common';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

@Injectable()
export class EquipamentosService {
  create(createEquipamentoDto: CreateEquipamentoDto) {
    return 'This action adds a new equipamento';
  }

  findAll() {
    return `This action returns all equipamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipamento`;
  }

  update(id: number, updateEquipamentoDto: UpdateEquipamentoDto) {
    return `This action updates a #${id} equipamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipamento`;
  }
}
