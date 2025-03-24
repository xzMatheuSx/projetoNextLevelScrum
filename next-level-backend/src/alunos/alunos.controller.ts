import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  @Get()
  findAll() {
    console.log('teste')
    return this.alunosService.findAll();
  }

  @Get(':matricula')
  findOne(@Param('matricula') matricula: number){
    return this.alunosService.findOne(matricula);
  }

  @Delete(':matricula')
  async remove(@Param('matricula', ParseIntPipe) matricula: number) {
    return this.alunosService.remove(matricula);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) matricula: number, // Garantir que o id seja um número
    @Body() updateAlunoDto: UpdateAlunoDto, // Dados para atualização
  ) {
    return this.alunosService.update(matricula, updateAlunoDto);
  }
}
