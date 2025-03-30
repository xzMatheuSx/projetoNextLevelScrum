import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planoService.create(createPlanoDto);
  }

  @Get()
  findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.planoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planoService.update(id, updatePlanoDto);
  }

}
