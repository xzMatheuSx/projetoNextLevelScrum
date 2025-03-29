import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity'; 
@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createVendaDto: CreateVendaDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: createVendaDto.usuarioAlt },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${createVendaDto.usuarioAlt} não encontrado`);
    }

    const venda = this.vendaRepository.create({
      ...createVendaDto,
      usuarioAlt: usuario, 
    });

    const savedVenda = await this.vendaRepository.save(venda);

    return (`Venda com ID ${savedVenda.id} cadastrada com sucesso`); 
  }

  async findAll(): Promise<Venda[]> {
    return await this.vendaRepository.find();
  }

  async findOne(id: number): Promise<Venda> {
    const venda = await this.vendaRepository.findOne({ where: { id } });
    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada`);
    }
    return venda;
  }

  async remove(id: number) {
    try {
      const result = await this.vendaRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Venda com ID ${id} não encontrada`);
      }
      return (`Venda com ID ${id} removida com sucesso`);
    } catch (error) {
      console.error(`Erro ao remover venda ${id}:`, error);
      throw new InternalServerErrorException('Falha ao remover Venda');
    }
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    try {
      const venda = await this.vendaRepository.findOne({ where: { id } });
      if (!venda) {
        throw new NotFoundException(`Venda com ID ${id} não encontrada`);
      }
      Object.assign(venda, updateVendaDto);
      await this.vendaRepository.save(venda);
      return ('Dados da venda atualizados com sucesso');
    } catch (error) {
      throw new InternalServerErrorException('Falha ao atualizar Venda');
    }
  }
}
