import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentoTipoService } from './equipamento-tipo.service';
import { CreateEquipamentoTipoDto } from './dto/create-equipamento-tipo.dto';
import { UpdateEquipamentoTipoDto } from './dto/update-equipamento-tipo.dto';

@Controller('equipamento-tipo')
export class EquipamentoTipoController {
  constructor(private readonly equipamentoTipoService: EquipamentoTipoService) {}

  @Post()
  create(@Body() createEquipamentoTipoDto: CreateEquipamentoTipoDto) {
    return this.equipamentoTipoService.create(createEquipamentoTipoDto);
  }

  @Get()
  findAll() {
    return this.equipamentoTipoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentoTipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipamentoTipoDto: UpdateEquipamentoTipoDto) {
    return this.equipamentoTipoService.update(+id, updateEquipamentoTipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipamentoTipoService.remove(+id);
  }
}
