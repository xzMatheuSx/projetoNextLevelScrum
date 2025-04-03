import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendaProdutoService } from './venda-produto.service';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';
import { UpdateVendaProdutoDto } from './dto/update-venda-produto.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('venda-produto')
export class VendaProdutoController {
  constructor(private readonly vendaProdutoService: VendaProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar venda produto' })
  create(@Body() createVendaProdutoDto: CreateVendaProdutoDto) {
    return this.vendaProdutoService.create(createVendaProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todas vendas produto' })

  findAll() {
    return this.vendaProdutoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retornar venda produto por id' })

  findOne(@Param('id') id: string) {
    return this.vendaProdutoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar venda produto' })

  update(@Param('id') id: string, @Body() updateVendaProdutoDto: UpdateVendaProdutoDto) {
    return this.vendaProdutoService.update(+id, updateVendaProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir venda produto' })

  remove(@Param('id') id: string) {
    return this.vendaProdutoService.remove(+id);
  }
}
