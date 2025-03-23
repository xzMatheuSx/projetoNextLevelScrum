import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';

@Module({
  imports: [AlunosModule, UsuariosModule, ProdutosModule, EquipamentosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
