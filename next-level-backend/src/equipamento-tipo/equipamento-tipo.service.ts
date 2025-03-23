import { Injectable } from '@nestjs/common';
import { CreateEquipamentoTipoDto } from './dto/create-equipamento-tipo.dto';
import { UpdateEquipamentoTipoDto } from './dto/update-equipamento-tipo.dto';

@Injectable()
export class EquipamentoTipoService {
  create(createEquipamentoTipoDto: CreateEquipamentoTipoDto) {
    return 'This action adds a new equipamentoTipo';
  }

  findAll() {
    return `This action returns all equipamentoTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipamentoTipo`;
  }

  update(id: number, updateEquipamentoTipoDto: UpdateEquipamentoTipoDto) {
    return `This action updates a #${id} equipamentoTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipamentoTipo`;
  }
}
