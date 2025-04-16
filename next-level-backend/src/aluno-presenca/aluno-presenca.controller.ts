import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlunoPresencaService } from './aluno-presenca.service';
import { CreateAlunoPresencaDto } from './dto/create-aluno-presenca.dto';
import { UpdateAlunoPresencaDto } from './dto/update-aluno-presenca.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SaidaDTO } from './dto/create-aluno-saida.dto';

@Controller('aluno-presenca')
export class AlunoPresencaController {
  constructor(private readonly alunoPresencaService: AlunoPresencaService) {}

  @Post("/entrada")
   @ApiOperation({ summary: 'Registra presença aluno' })
  create(@Body() createAlunoPresencaDto: CreateAlunoPresencaDto) {
    return this.alunoPresencaService.checkIn(createAlunoPresencaDto);
  }

  @Post("/saida")
  @ApiOperation({ summary: 'Registra presença aluno' })
 createe(@Body() createAlunoSaidaDto: SaidaDTO) {
   return this.alunoPresencaService.checkOut(createAlunoSaidaDto);
 }

 @Get("todos")
 @ApiOperation({ summary: 'Pesquisa todas presenças' })
 findAll() {
   return this.alunoPresencaService.findAll();
 }

 @Get('matricula/:matricula')
 @ApiOperation({ summary: 'Pesquisa todas presenças de um aluno por matrícula' })
 findByMatricula(@Param('matricula') matricula: number) {
   return this.alunoPresencaService.findByMatricula({ alunoMatricula: matricula } as any);
 }

 @Get("presentes")
 @ApiOperation({ summary: 'Pesquisa todos os alunos presentes' })
 retornaTodosAlunosPresentes() {
   return this.alunoPresencaService.retornaTodosAlunosPresentes();
 }

 @Get("presentes-dia")
 @ApiOperation({ summary: 'Pesquisa todos os alunos presentes' })
 retornaTodosPresentesDia() {
   return this.alunoPresencaService.retornaTodosPresentesDia();
 }


/*
  @Get()
  @ApiOperation({ summary: 'Pesquisa todas presenças' })
  findAll() {
    return this.alunoPresencaService.findAll();
  }

  @Get('/pesquisar')
  @ApiOperation({ summary: 'Filtro presenças' })

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
  @ApiOperation({ summary: 'Retorna presença por ID' })

  findOne(@Param('id') id: string) {
    return this.alunoPresencaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: ' Edita presença' })

  update(@Param('id') id: string, @Body() updateAlunoPresencaDto: UpdateAlunoPresencaDto) {
    return this.alunoPresencaService.update(+id, updateAlunoPresencaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui presença' })

  remove(@Param('id') id: string) {
    return this.alunoPresencaService.remove(+id);
  }
    */
}
