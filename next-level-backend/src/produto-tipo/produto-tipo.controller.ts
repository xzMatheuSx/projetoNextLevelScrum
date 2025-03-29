import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoTipoService } from './produto-tipo.service';
import { CreateProdutoTipoDto } from './dto/create-produto-tipo.dto';
import { UpdateProdutoTipoDto } from './dto/update-produto-tipo.dto';
import { ListProdutoTipoDto } from './dto/list-produto-tipo.dto';

@Controller('produto-tipo')
export class ProdutoTipoController {
  constructor(private readonly produtoTipoService: ProdutoTipoService) {}

  @Post()
  create(@Body() createProdutoTipoDto: CreateProdutoTipoDto) {
    return this.produtoTipoService.create(createProdutoTipoDto);
  }

  @Get()
  findAll(): Promise<ListProdutoTipoDto[]>  {
    return this.produtoTipoService.findAll();
  }

  @Get('/retorna/:id')
  findOne(@Param('id') id: string) {
    return this.produtoTipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoTipoDto: UpdateProdutoTipoDto) {
    return this.produtoTipoService.update(+id, updateProdutoTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoTipoService.remove(+id);
  }

  @Get('/unidade-medida')
  retornaUnidadeMedidas() {
    return this.produtoTipoService.retornaUnidadeMedidas();
  }
}
