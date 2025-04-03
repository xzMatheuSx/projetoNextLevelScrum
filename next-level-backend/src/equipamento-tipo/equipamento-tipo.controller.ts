import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentoTipoService } from './equipamento-tipo.service';
import { CreateEquipamentoTipoDto } from './dto/create-equipamento-tipo.dto';
import { UpdateEquipamentoTipoDto } from './dto/update-equipamento-tipo.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('equipamento-tipo')
export class EquipamentoTipoController {
  constructor(private readonly equipamentoTipoService: EquipamentoTipoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar equipamento tipo' })
  create(@Body() createEquipamentoTipoDto: CreateEquipamentoTipoDto) {
    return this.equipamentoTipoService.create(createEquipamentoTipoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os equpipamentos tipo' })
  findAll() {
    return this.equipamentoTipoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna equipamento tipo por id' })
  findOne(@Param('id') id: string) {
    return this.equipamentoTipoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edita  equpamento tipo' })
  update(@Param('id') id: string, @Body() updateEquipamentoTipoDto: UpdateEquipamentoTipoDto) {
    return this.equipamentoTipoService.update(+id, updateEquipamentoTipoDto);
  }

  /*@Delete(':id')
  @ApiOperation({ summary: 'Cadastrar equpamento tipo' })
  remove(@Param('id') id: string) {
    return this.equipamentoTipoService.remove(+id);
  }*/
}
