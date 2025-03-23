import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentoEstoqueService } from './movimento-estoque.service';
import { CreateMovimentoEstoqueDto } from './dto/create-movimento-estoque.dto';
import { UpdateMovimentoEstoqueDto } from './dto/update-movimento-estoque.dto';

@Controller('movimento-estoque')
export class MovimentoEstoqueController {
  constructor(private readonly movimentoEstoqueService: MovimentoEstoqueService) {}

  @Post()
  create(@Body() createMovimentoEstoqueDto: CreateMovimentoEstoqueDto) {
    return this.movimentoEstoqueService.create(createMovimentoEstoqueDto);
  }

  @Get()
  findAll() {
    return this.movimentoEstoqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentoEstoqueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentoEstoqueDto: UpdateMovimentoEstoqueDto) {
    return this.movimentoEstoqueService.update(+id, updateMovimentoEstoqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentoEstoqueService.remove(+id);
  }
}
