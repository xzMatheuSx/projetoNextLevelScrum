import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar plano' })
  
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planoService.create(createPlanoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos os planos' })

  findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retornar plano por id' })

  findOne(@Param('id') id: number) {
    return this.planoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar plano' })

  update(@Param('id') id: number, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planoService.update(id, updatePlanoDto);
  }

}
