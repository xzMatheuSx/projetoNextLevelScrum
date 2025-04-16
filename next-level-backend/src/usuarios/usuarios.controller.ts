import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de usuario' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }


  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('/ativos')
  @ApiOperation({ summary: 'Retorna todos os usuarios ativos' })
  findAllAtivos() {
    return this.usuariosService.findAllAtivos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna usuario por id' })
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edição de usuário' })

  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclusão de usuario' })

  remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
