import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentosManutencaoService } from './equipamentos-manutencao.service';
import { CreateEquipamentosManutencaoDto } from './dto/create-equipamentos-manutencao.dto';
import { UpdateEquipamentosManutencaoDto } from './dto/update-equipamentos-manutencao.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('equipamentos-manutencao')
export class EquipamentosManutencaoController {
  constructor(private readonly equipamentosManutencaoService: EquipamentosManutencaoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar manutenção equipamento' })
  create(@Body() createEquipamentosManutencaoDto: CreateEquipamentosManutencaoDto) {
    return this.equipamentosManutencaoService.create(createEquipamentosManutencaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas manutenções de equipamento' })
  findAll() {
    return this.equipamentosManutencaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna manutenção por id' })
  findOne(@Param('id') id: string) {
    return this.equipamentosManutencaoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edita manutenção' })
  update(@Param('id') id: string, @Body() updateEquipamentosManutencaoDto: UpdateEquipamentosManutencaoDto) {
    return this.equipamentosManutencaoService.update(+id, updateEquipamentosManutencaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui manutenção' })
  remove(@Param('id') id: string) {
    return this.equipamentosManutencaoService.remove(+id);
  }
}
