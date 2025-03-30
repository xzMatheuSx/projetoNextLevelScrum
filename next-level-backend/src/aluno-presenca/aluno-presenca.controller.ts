import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlunoPresencaService } from './aluno-presenca.service';
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';

@Controller('aluno-presenca')
export class AlunoPresencaController {
  constructor(private readonly alunoPresencaService: AlunoPresencaService) {}

  @Post()
  create(@Body() createAlunoPresencaDto: CreateAlunoPresencaDto) {
    return this.alunoPresencaService.create(createAlunoPresencaDto);
  }


  @Get()
  findAll() {
    return this.alunoPresencaService.findAll();
  }

  @Get('/pesquisar')
  pesquisarPresencaAluno(
    @Query('dataIni') dataIni: Date,
    @Query("dataFim") dataFim: Date,
    @Query("aluno") aluno: string
    ) {
    return this.alunoPresencaService.pesquisarPresencaAluno(
        dataIni, dataFim, aluno
    );
  }

  @Get('/retornar/:id')
  findOne(@Param('id') id: string) {
    return this.alunoPresencaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoPresencaDto: UpdateAlunoPresencaDto) {
    return this.alunoPresencaService.update(+id, updateAlunoPresencaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoPresencaService.remove(+id);
  }
}
