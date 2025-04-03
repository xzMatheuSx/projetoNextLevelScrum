import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoTipoService } from './produto-tipo.service';
import { CreateProdutoTipoDto } from './dto/create-produto-tipo.dto';
import { UpdateProdutoTipoDto } from './dto/update-produto-tipo.dto';
import { ListProdutoTipoDto } from './dto/list-produto-tipo.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('produto-tipo')
export class ProdutoTipoController {
  constructor(private readonly produtoTipoService: ProdutoTipoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produto tipo' })
  create(@Body() createProdutoTipoDto: CreateProdutoTipoDto) {
    return this.produtoTipoService.create(createProdutoTipoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar produto tipo' })
  findAll(): Promise<ListProdutoTipoDto[]>  {
    return this.produtoTipoService.findAll();
  }

  @Get('/retorna/:id')
  @ApiOperation({ summary: 'Retornar produto tipo por id' })
  findOne(@Param('id') id: string) {
    return this.produtoTipoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar produto tipo' })
  update(@Param('id') id: string, @Body() updateProdutoTipoDto: UpdateProdutoTipoDto) {
    return this.produtoTipoService.update(+id, updateProdutoTipoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto tipo' })
  remove(@Param('id') id: string) {
    return this.produtoTipoService.remove(+id);
  }

  @Get('/unidade-medida')
  @ApiOperation({ summary: 'Retorna unidades medida' })
  retornaUnidadeMedidas() {
    return this.produtoTipoService.retornaUnidadeMedidas();
  }
}
