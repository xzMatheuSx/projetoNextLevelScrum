import { Injectable } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PlanoService {
  create(createPlanoDto: CreatePlanoDto) {
    return 'This action adds a new plano';
  }

  findAll() {
    return `This action returns all plano`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plano`;
  }

  update(id: number, updatePlanoDto: UpdatePlanoDto) {
    return `This action updates a #${id} plano`;
  }

  remove(id: number) {
    return `This action removes a #${id} plano`;
  }
}
