import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Academia Next Level')
        .setDescription('Documentação da API Next Level')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    app.enableCors();
    
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 App rodando na porta ${port}`);
}
bootstrap();
