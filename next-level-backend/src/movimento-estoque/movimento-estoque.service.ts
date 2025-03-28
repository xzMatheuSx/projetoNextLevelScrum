import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimentoEstoque } from './entities/movimento-estoque.entity';
import { CreateMovimentoEstoqueDto } from './dto/create-movimento-estoque.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity'; 
import { UpdateMovimentoEstoqueDto } from './dto/update-movimento-estoque.dto';

@Injectable()
export class MovimentoEstoqueService {
  constructor(
    @InjectRepository(MovimentoEstoque)
    private movimentoEstoqueRepository: Repository<MovimentoEstoque>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, 
  ) {}

  async create(createMovimentoEstoqueDto: CreateMovimentoEstoqueDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: createMovimentoEstoqueDto.usuarioAlt },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${createMovimentoEstoqueDto.usuarioAlt} não encontrado`);
    }

    const movimentoEstoque = this.movimentoEstoqueRepository.create({
      ...createMovimentoEstoqueDto,
      usuarioAlt: usuario, 
    });

    try {
      await this.movimentoEstoqueRepository.save(movimentoEstoque);
      return 'Movimento de estoque registrado com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Erro ao registrar o movimento de estoque', error.message);
    }
  }
  async findAll(): Promise<MovimentoEstoque[]> {
    return await this.movimentoEstoqueRepository.find();
  }

  async findOne(id: number): Promise<MovimentoEstoque> {
    const movimentoEstoque = await this.movimentoEstoqueRepository.findOne({ where: { id } });
    if (!movimentoEstoque) {
      throw new NotFoundException(`Movimento de estoque com ID ${id} não encontrado`);
    }
    return movimentoEstoque;
  }

  async remove(id: number) {
    try {
      const result = await this.movimentoEstoqueRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Movimento de estoque com ID ${id} não encontrado`);
      }
      return `Movimento de estoque com ID ${id} removido com sucesso`;
    } catch (error) {
      console.error(`Erro ao remover movimento de estoque ${id}:`, error);
      throw new InternalServerErrorException('Falha ao remover Movimento de Estoque');
    }
  }

  async update(id: number, updateMovimentoEstoqueDto: UpdateMovimentoEstoqueDto) {
    try {
      const movimentoEstoque = await this.movimentoEstoqueRepository.findOne({ where: { id } });
      if (!movimentoEstoque) {
        throw new NotFoundException(`Movimento de estoque com ID ${id} não encontrado`);
      }
      Object.assign(movimentoEstoque, updateMovimentoEstoqueDto);
      await this.movimentoEstoqueRepository.save(movimentoEstoque);
      return 'Dados do movimento de estoque atualizados com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar Movimento de Estoque');
    }
  }
}
