import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUsuarioDTO } from 'src/usuarios/dto/login-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/login")
  @ApiOperation({ summary: 'Login de usuario' })
  loginUsuario(@Body() loginUsuario: LoginUsuarioDTO) {
    return this.authService.generateToken(loginUsuario);
  }
}