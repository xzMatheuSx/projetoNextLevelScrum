import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagamentoAlunoService } from './pagamento-aluno.service';
import { CreatePagamentoAlunoDto } from './dto/create-pagamento-aluno.dto';
import { UpdatePagamentoAlunoDto } from './dto/update-pagamento-aluno.dto';

@Controller('pagamento-aluno')
export class PagamentoAlunoController {
  constructor(private readonly pagamentoAlunoService: PagamentoAlunoService) {}

  @Post()
  create(@Body() createPagamentoAlunoDto: CreatePagamentoAlunoDto) {
    return this.pagamentoAlunoService.create(createPagamentoAlunoDto);
  }

  @Get()
  findAll() {
    return this.pagamentoAlunoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoAlunoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagamentoAlunoDto: UpdatePagamentoAlunoDto) {
    return this.pagamentoAlunoService.update(+id, updatePagamentoAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoAlunoService.remove(+id);
  }
}
