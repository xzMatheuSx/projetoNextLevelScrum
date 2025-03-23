import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';
import { CreateEquipamentosManutencaoDto } from './dto/create-equipamentos-manutencao.dto';
import { UpdateEquipamentosManutencaoDto } from './dto/update-equipamentos-manutencao.dto';

@Controller('equipamentos-manutencao')
export class EquipamentosManutencaoController {
  constructor(private readonly equipamentosManutencaoService: EquipamentosManutencaoService) {}

  @Post()
  create(@Body() createEquipamentosManutencaoDto: CreateEquipamentosManutencaoDto) {
    return this.equipamentosManutencaoService.create(createEquipamentosManutencaoDto);
  }

  @Get()
  findAll() {
    return this.equipamentosManutencaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipamentosManutencaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipamentosManutencaoDto: UpdateEquipamentosManutencaoDto) {
    return this.equipamentosManutencaoService.update(+id, updateEquipamentosManutencaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipamentosManutencaoService.remove(+id);
  }
}
