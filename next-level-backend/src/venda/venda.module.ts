import { Module } from '@nestjs/common';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { VendaProduto } from 'src/venda-produto/entities/venda-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, Usuario])], 
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}
