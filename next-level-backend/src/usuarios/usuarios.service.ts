import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private UsuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto){
    const Usuario = this.UsuariosRepository.create(createUsuarioDto);
    const aux = await this.UsuariosRepository.save(Usuario);
    return (`Usuario ${aux.nome} cadastrado com sucesso`)
  }

  async findAll(): Promise<Usuario[]> {
    return await this.UsuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const Usuario = await this.UsuariosRepository.findOne({ where: { id} });
    if (!Usuario) {
      throw new NotFoundException(`Usuario com o id ${id} não encontrado`);
    }
    return Usuario;
  }

  async remove(id: number){
    try {
      const result = await this.UsuariosRepository.delete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario com o ID ${id} não encontrado`);
      }
      
      console.log(`Usuario com a id ${id} removido com sucesso`);
      return (`Usuario com a id ${id} removido com sucesso`)
    } catch (error) {
      console.error(`Erro ao remover Usuario ${id}:`, error);
      throw new InternalServerErrorException('Falha ao remover Usuario');
    }
  }
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto){
    try{
      const Usuario = await this.UsuariosRepository.findOne({ where: { id } });
      if (!Usuario) {
        throw new NotFoundException(`Usuario com ID ${id} não encontrado`);
      }
      Object.assign(Usuario, updateUsuarioDto);
  
      this.UsuariosRepository.save(Usuario);
      return ('dados atualizados com sucesso')
    }catch(error){
      throw new InternalServerErrorException('Falha ao atualizar Usuario')
    }
    
  }

}
