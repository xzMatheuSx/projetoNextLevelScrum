import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipamentosManutencao } from './entities/equipamentos-manutencao.entity';
import { CreateEquipamentosManutencaoDto } from './dto/create-equipamentos-manutencao.dto';
import { UpdateEquipamentosManutencaoDto } from './dto/update-equipamentos-manutencao.dto';
import { Equipamento } from 'src/equipamentos/entities/equipamento.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class EquipamentosManutencaoService {
  constructor(
    @InjectRepository(EquipamentosManutencao)
    private manutencaoRepository: Repository<EquipamentosManutencao>,
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>, 
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>, 
  ) {}

  async create(createEquipamentosDto: CreateEquipamentosManutencaoDto) {
    const equipamento = await this.equipamentoRepository.findOneOrFail({
      where: { id: createEquipamentosDto.equipamentoId },
    }).catch(() => {
      throw new NotFoundException(`Equipamento com ID ${createEquipamentosDto.equipamentoId} não encontrado`);
    });

    const usuario = await this.usuarioRepository.findOneOrFail({
      where: { id: createEquipamentosDto.usuarioAlt },
    }).catch(() => {
      throw new NotFoundException(`Usuário com ID ${createEquipamentosDto.usuarioAlt} não encontrado`);
    });

    const manutencao = this.manutencaoRepository.create({
      ...createEquipamentosDto,
      equipamento: equipamento,
      usuarioAlt: usuario,  
    });

    return await this.manutencaoRepository.save(manutencao);
  }

  async findAll(): Promise<EquipamentosManutencao[]> {
    return await this.manutencaoRepository.find();
  }

  async findOne(id: number): Promise<EquipamentosManutencao> {
    const manutencao = await this.manutencaoRepository.findOne({ where: { id } });
    if (!manutencao) {
      throw new NotFoundException(`Manutenção de equipamento com ID ${id} não encontrada`);
    }
    return manutencao;
  }

  async update(id: number, updateEquipamentosManutencaoDto: UpdateEquipamentosManutencaoDto) {
    const manutencao = await this.manutencaoRepository.findOne({ where: { id } });
    if (!manutencao) {
      throw new NotFoundException(`Manutenção de equipamento com ID ${id} não encontrada`);
    }
    Object.assign(manutencao, updateEquipamentosManutencaoDto);
    return await this.manutencaoRepository.save(manutencao);
  }

  async remove(id: number) {
    const result = await this.manutencaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Manutenção de equipamento com ID ${id} não encontrada`);
    }
    return `Manutenção de equipamento com ID ${id} removida com sucesso`;
  }
}