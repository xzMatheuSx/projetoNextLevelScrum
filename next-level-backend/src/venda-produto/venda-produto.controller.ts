import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendaProdutoService } from './venda-produto.service';
import { CreateVendaProdutoDto } from './dto/create-venda-produto.dto';
import { UpdateVendaProdutoDto } from './dto/update-venda-produto.dto';

@Controller('venda-produto')
export class VendaProdutoController {
  constructor(private readonly vendaProdutoService: VendaProdutoService) {}

  @Post()
  create(@Body() createVendaProdutoDto: CreateVendaProdutoDto) {
    return this.vendaProdutoService.create(createVendaProdutoDto);
  }

  @Get()
  findAll() {
    return this.vendaProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendaProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendaProdutoDto: UpdateVendaProdutoDto) {
    return this.vendaProdutoService.update(+id, updateVendaProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendaProdutoService.remove(+id);
  }
}
