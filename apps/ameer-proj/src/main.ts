import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSw = new DocumentBuilder()
  .setTitle('Swagger Service A')
  .setDescription('This services allows to get your data and find things in it')
  .setVersion('1.0')
  .addTag('MAIN', 'Create, Get and Find data in DB.')
  .build();

  const documentSw = SwaggerModule.createDocument(app, configSw)
  SwaggerModule.setup('api', app, documentSw);

  await app.listen(4000);
}
bootstrap();
