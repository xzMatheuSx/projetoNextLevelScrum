import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipamentosService } from './equipamentos.service';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly equipamentosService: EquipamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar equipamento' })
  create(@Body() createEquipamentoDto: CreateEquipamentoDto) {
    return this.equipamentosService.create(createEquipamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos equipamentos' })
  findAll() {
    return this.equipamentosService.findAll();
  }


  @Get(':id')
@ApiOperation({ summary: 'Retorna equipamento por ID' })
async findOne(@Param('id') id: number){
  return this.equipamentosService.findOneBy(id); 
}

  @Patch(':id')
  @ApiOperation({ summary: 'Editar equipamento' })
  update(@Param('id') id: string, @Body() updateEquipamentoDto: UpdateEquipamentoDto) {
    return this.equipamentosService.update(+id, updateEquipamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir equipamento' })
  remove(@Param('id') id: string) {
    return this.equipamentosService.remove(+id);
  }
}
