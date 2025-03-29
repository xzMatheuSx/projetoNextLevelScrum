import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoAlunoService } from './plano-aluno.service';
import { CreatePlanoAlunoDto } from './dto/create-plano-aluno.dto';
import { UpdatePlanoAlunoDto } from './dto/update-plano-aluno.dto';

@Controller('plano-aluno')
export class PlanoAlunoController {
  constructor(private readonly planoAlunoService: PlanoAlunoService) {}

  @Post()
  create(@Body() createPlanoAlunoDto: CreatePlanoAlunoDto) {
    return this.planoAlunoService.create(createPlanoAlunoDto);
  }

  @Get()
  findAll() {
    return this.planoAlunoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoAlunoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoAlunoDto: UpdatePlanoAlunoDto) {
    return this.planoAlunoService.update(+id, updatePlanoAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planoAlunoService.remove(+id);
  }
}
