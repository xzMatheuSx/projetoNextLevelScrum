import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendaProduto } from './entities/venda-produto.entity';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';

@Injectable()
export class VendaProdutoService {
  constructor(
    @InjectRepository(VendaProduto)
    private vendaProdutoRepository: Repository<VendaProduto>,
  ) {}

  async create(createVendaProdutoDto: CreateVendaProdutoDto) {
    const vendaProduto = this.vendaProdutoRepository.create(createVendaProdutoDto);
    const savedVendaProduto = await this.vendaProdutoRepository.save(vendaProduto);
    return (`Produto da venda com ID ${savedVendaProduto.id} cadastrado com sucesso`);
  }

  async findAll(): Promise<VendaProduto[]> {
    return await this.vendaProdutoRepository.find();
  }

  async findOne(id: number): Promise<VendaProduto> {
    const vendaProduto = await this.vendaProdutoRepository.findOne({ where: { id } });
    if (!vendaProduto) {
      throw new NotFoundException(`Produto da venda com ID ${id} não encontrado`);
    }
    return vendaProduto;
  }

  async remove(id: number) {
    try {
      const result = await this.vendaProdutoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Produto da venda com ID ${id} não encontrado`);
      }
      return (`Produto da venda com ID ${id} removido com sucesso`);
    } catch (error) {
      console.error(`Erro ao remover produto da venda ${id}:`, error);
      throw new InternalServerErrorException('Falha ao remover Produto da Venda');
    }
  }

  async update(id: number, updateVendaProdutoDto: any) {
    try {
      const vendaProduto = await this.vendaProdutoRepository.findOne({ where: { id } });
      if (!vendaProduto) {
        throw new NotFoundException(`Produto da venda com ID ${id} não encontrado`);
      }
      Object.assign(vendaProduto, updateVendaProdutoDto);
      await this.vendaProdutoRepository.save(vendaProduto);
      return ('Dados do produto da venda atualizados com sucesso');
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar Produto da Venda');
    }
  }
}
