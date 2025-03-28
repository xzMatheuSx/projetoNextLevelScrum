import { Module } from '@nestjs/common';
import { ProdutoTipoService } from './produto-tipo.service';
import { ProdutoTipoController } from './produto-tipo.controller';
import { ProdutoTipo } from './entities/produto-tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from 'src/produto/entities/produto.entity';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
     imports: [TypeOrmModule.forFeature([ProdutoTipo, Produto])], 
  controllers: [ProdutoTipoController],
  providers: [ProdutoTipoService],
})
export class ProdutoTipoModule {}
