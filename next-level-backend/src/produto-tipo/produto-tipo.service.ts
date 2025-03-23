import { Injectable } from '@nestjs/common';
import { CreateProdutoTipoDto } from './dto/create-produto-tipo.dto';
import { UpdateProdutoTipoDto } from './dto/update-produto-tipo.dto';

@Injectable()
export class ProdutoTipoService {
  create(createProdutoTipoDto: CreateProdutoTipoDto) {
    return 'This action adds a new produtoTipo';
  }

  findAll() {
    return `This action returns all produtoTipo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produtoTipo`;
  }

  update(id: number, updateProdutoTipoDto: UpdateProdutoTipoDto) {
    return `This action updates a #${id} produtoTipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} produtoTipo`;
  }
}
