import { Module } from '@nestjs/common';
import { VendaProdutoService } from './venda-produto.service';
import { VendaProdutoController } from './venda-produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaProduto } from './entities/venda-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendaProduto])], 
  controllers: [VendaProdutoController],
  providers: [VendaProdutoService],
})
export class VendaProdutoModule {}
