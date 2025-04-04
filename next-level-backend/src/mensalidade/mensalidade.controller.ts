import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MensalidadeService } from './mensalidade.service';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';

@Controller('mensalidade')
export class MensalidadeController {
  constructor(private readonly mensalidadeService: MensalidadeService) {}

  @Post()
  create(@Body() createMensalidadeDto: CreateMensalidadeDto) {
    return this.mensalidadeService.criarMensalidade(createMensalidadeDto);
  }

  /*@Get()
  findAll() {
    return this.mensalidadeService.findAll();
  }*/
}
