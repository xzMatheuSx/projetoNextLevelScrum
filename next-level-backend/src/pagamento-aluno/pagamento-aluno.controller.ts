import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagamentoAlunoService } from './pagamento-aluno.service';
import { CreatePagamentoAlunoDto } from './dto/create-pagamento-aluno.dto';
import { UpdatePagamentoAlunoDto } from './dto/update-pagamento-aluno.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pagamento-aluno')
export class PagamentoAlunoController {
  constructor(private readonly pagamentoAlunoService: PagamentoAlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar pagamento aluno' })
  create(@Body() createPagamentoAlunoDto: CreatePagamentoAlunoDto) {
    return this.pagamentoAlunoService.create(createPagamentoAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos pagamento aluno' })
  findAll() {
    return this.pagamentoAlunoService.findAll();
  }

  @ApiOperation({ summary: 'Retornar pagamento aluno por id' })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoAlunoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar pagamento aluno' })

  update(@Param('id') id: string, @Body() updatePagamentoAlunoDto: UpdatePagamentoAlunoDto) {
    return this.pagamentoAlunoService.update(+id, updatePagamentoAlunoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir pagamento aluno' })

  remove(@Param('id') id: string) {
    return this.pagamentoAlunoService.remove(+id);
  }
}
