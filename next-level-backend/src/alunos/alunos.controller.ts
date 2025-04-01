import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
    @ApiOperation({ summary: 'Criar aluno' })
  
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos os alunos' })

  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':matricula')
  @ApiOperation({ summary: 'Retornar aluno por matricula' })

  findOne(@Param('matricula') matricula: number){
    return this.alunosService.findOne(matricula);
  }

  @Delete(':matricula')
  @ApiOperation({ summary: 'Inativar aluno' })

  async remove(@Param('matricula', ParseIntPipe) matricula: number) {
    return this.alunosService.remove(matricula);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar aluno' })

  async update(
    @Param('id', ParseIntPipe) matricula: number,
    @Body() updateAlunoDto: UpdateAlunoDto, 
  ) {
    return this.alunosService.update(matricula, updateAlunoDto);
  }
}
