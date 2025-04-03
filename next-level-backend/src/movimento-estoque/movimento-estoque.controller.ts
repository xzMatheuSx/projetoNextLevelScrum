import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentoEstoqueService } from './movimento-estoque.service';
import { CreateMovimentoEstoqueDto } from './dto/create-movimento-estoque.dto';
import { UpdateMovimentoEstoqueDto } from './dto/update-movimento-estoque.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('movimento-estoque')
export class MovimentoEstoqueController {
  constructor(private readonly movimentoEstoqueService: MovimentoEstoqueService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar movimento de estoque' })
  
  create(@Body() createMovimentoEstoqueDto: CreateMovimentoEstoqueDto) {
    return this.movimentoEstoqueService.create(createMovimentoEstoqueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar movimentos de estoque' })

  findAll() {
    return this.movimentoEstoqueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retornar movimento por id' })

  findOne(@Param('id') id: string) {
    return this.movimentoEstoqueService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar movimento' })

  update(@Param('id') id: string, @Body() updateMovimentoEstoqueDto: UpdateMovimentoEstoqueDto) {
    return this.movimentoEstoqueService.update(+id, updateMovimentoEstoqueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir movimento' })

  remove(@Param('id') id: string) {
    return this.movimentoEstoqueService.remove(+id);
  }
}
