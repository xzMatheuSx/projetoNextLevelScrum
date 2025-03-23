import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunosModule } from './alunos/alunos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProdutosModule } from './produtos/produtos.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Aluno } from './alunos/entities/aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432,
      username: 'root', 
      password: 'root',
      database: 'NextLevel', 
      entities: [Usuario,Aluno],
      synchronize: true, 
    }),
    AlunosModule,
    UsuariosModule,
    ProdutosModule,
    EquipamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}