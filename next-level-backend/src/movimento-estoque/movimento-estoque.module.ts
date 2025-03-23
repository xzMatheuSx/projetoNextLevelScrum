import { Module } from '@nestjs/common';
import { MovimentoEstoqueService } from './movimento-estoque.service';
import { MovimentoEstoqueController } from './movimento-estoque.controller';

@Module({
  controllers: [MovimentoEstoqueController],
  providers: [MovimentoEstoqueService],
})
export class MovimentoEstoqueModule {}
