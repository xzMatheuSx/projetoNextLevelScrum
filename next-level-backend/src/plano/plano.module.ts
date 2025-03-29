import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { Plano } from './entities/plano.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plano, Usuario])],  
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
