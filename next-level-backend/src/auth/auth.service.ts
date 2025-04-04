import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDTO } from 'src/usuarios/dto/login-usuario.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(Usuario)
    private UsuariosRepository: Repository<Usuario>
  ) {}

  async validateUser(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateToken(user: LoginUsuarioDTO) {
    const usu = await this.UsuariosRepository.find({ where: { 
            usuario: user.usuario,
            senha: user.senha
        } })
    
    console.log(usu)
    if (usu.length == 0){
        throw new BadRequestException("Atenção! Verifique se o USUÁRIO e a SENHA estão corretos?") 
    }

    if (usu[0].ativo == false){
        throw new BadRequestException("Atenção! O usuário está inativo, não será possível efetuar o login") 
    }

    const payload = { username: user.usuario, sub: usu[0].id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}