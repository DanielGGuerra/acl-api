import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Um simples ACL - API')
    .setDescription('Sistema de Autenticação e Autorização')
    .setVersion('1.0.0')
    .addApiKey({ description: 'Baerer Token', type: 'apiKey' }, 'Authorization')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
