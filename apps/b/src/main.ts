import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BModule } from './b.module';

async function bootstrap() {
  const app = await NestFactory.create(BModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://jgnvnery:aVFFOqCFEfmA1yYgnZzW91sYtp1FRDY4@cougar.rmq.cloudamqp.com/jgnvnery'],
      queue: 'default',
      queueOptions: {
        durable: false
      },
    },
  });
  const configSw = new DocumentBuilder()
  .setTitle('Swagger Service B')
  .setDescription('Logger Service API Doc')
  .setVersion('1.0')
  .build();

  const documentSw = SwaggerModule.createDocument(app, configSw);
  SwaggerModule.setup('api', app, documentSw);  
  
  app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
