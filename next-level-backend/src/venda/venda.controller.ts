import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar venda' })
  
  create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.create(createVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas venda' })

  findAll() {
    return this.vendaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna venda por id' })

  findOne(@Param('id') id: string) {
    return this.vendaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar venda' })

  update(@Param('id') id: string, @Body() updateVendaDto: UpdateVendaDto) {
    return this.vendaService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exluir venda' })

  remove(@Param('id') id: string) {
    return this.vendaService.remove(+id);
  }
}
