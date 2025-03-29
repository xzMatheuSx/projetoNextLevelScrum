import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PesquisaUsuarioDTO } from './dto/pesquisa-usuario.dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private UsuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto){

    const Usuario = this.UsuariosRepository.create(createUsuarioDto);

    if ((await this.UsuariosRepository.find({ where: { usuario : createUsuarioDto.usuario}})).length > 0) {
        throw new BadRequestException("Atenção! Esse nome de usuário já está sendo utilizado, será preciso informar outro!")
    }

    if (createUsuarioDto.senha.length < 10){
        throw new BadRequestException("Atenção! É preciso que o campo de senha tenha pelo menos 10 caracteres!")
    }

    const aux = await this.UsuariosRepository.save(Usuario);
    return (`Usuario ${aux.nome} cadastrado com sucesso`)
  }

  async findAll(): Promise<PesquisaUsuarioDTO[]> {
    let users = await this.UsuariosRepository.find();

    return users.map((u: Usuario) => new PesquisaUsuarioDTO(u.id, u.nome, u.email, u.ativo));
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
      const usu = await this.UsuariosRepository.findOne({ where: { id} });
         
      if (!Usuario) {
        throw new NotFoundException(`Usuario com o id ${id} não encontrado`);
      }
      
      usu!.ativo = false 

      this.UsuariosRepository.save(usu!);

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

      if (updateUsuarioDto?.usuario){
        if ((await this.UsuariosRepository.find({ where: { usuario : updateUsuarioDto.usuario, id: Not(id) }})).length > 0) {
            throw new BadRequestException("Atenção! Esse nome de usuário já está sendo utilizado, será preciso informar outro!")
        }
      }

        if (updateUsuarioDto?.senha){
            if (updateUsuarioDto?.senha?.length < 10){
                throw new BadRequestException("Atenção! É preciso que o campo de senha tenha pelo menos 10 caracteres!")
            }
        }       

      Object.assign(Usuario, updateUsuarioDto);
  
      this.UsuariosRepository.save(Usuario);
      return ('dados atualizados com sucesso')
    }catch(error){
        throw error
      //throw new InternalServerErrorException('Falha ao atualizar Usuario')
    }
    
  }

}
