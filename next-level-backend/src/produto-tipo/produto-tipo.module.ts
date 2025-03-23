import { Module } from '@nestjs/common';
import { ProdutoTipoService } from './produto-tipo.service';
import { ProdutoTipoController } from './produto-tipo.controller';

@Module({
  controllers: [ProdutoTipoController],
  providers: [ProdutoTipoService],
})
export class ProdutoTipoModule {}
