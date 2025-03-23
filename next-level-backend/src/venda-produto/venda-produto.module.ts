import { Module } from '@nestjs/common';
import { VendaProdutoService } from './venda-produto.service';
import { VendaProdutoController } from './venda-produto.controller';

@Module({
  controllers: [VendaProdutoController],
  providers: [VendaProdutoService],
})
export class VendaProdutoModule {}
