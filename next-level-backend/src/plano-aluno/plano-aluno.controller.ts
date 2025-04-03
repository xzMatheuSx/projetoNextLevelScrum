import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoAlunoService } from './plano-aluno.service';
import { CreatePlanoAlunoDto } from './dto/create-plano-aluno.dto';
import { UpdatePlanoAlunoDto } from './dto/update-plano-aluno.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('plano-aluno')
export class PlanoAlunoController {
  constructor(private readonly planoAlunoService: PlanoAlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar plano por aluno' })
  create(@Body() createPlanoAlunoDto: CreatePlanoAlunoDto) {
    console.log("dto> " + JSON.stringify(createPlanoAlunoDto, null, 2));
    return this.planoAlunoService.create(createPlanoAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos os planos alunos' })
  findAll() {
    return this.planoAlunoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retornar plano aluno por id' })
  findOne(@Param('id') id: string) {
    return this.planoAlunoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar plano aluno' })
  update(@Param('id') id: string, @Body() updatePlanoAlunoDto: UpdatePlanoAlunoDto) {
    return this.planoAlunoService.update(+id, updatePlanoAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir plano aluno' })
  remove(@Param('id') id: string) {
    return this.planoAlunoService.remove(+id);
  }
}
