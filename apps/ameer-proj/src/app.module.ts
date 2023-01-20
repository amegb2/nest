import { HttpModule } from '@nestjs/axios';
import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../../../libs/common/src/index';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


@Module({
  imports: [HttpModule,
            DatabaseModule,
            ClientsModule.register([
              {
                name: 'LOGGER_SERVICE',
                transport: Transport.RMQ,
                options: {
                  urls: ['amqps://jgnvnery:aVFFOqCFEfmA1yYgnZzW91sYtp1FRDY4@cougar.rmq.cloudamqp.com/jgnvnery'],
                  queue: 'default',
                  queueOptions: {
                    durable: false
                  },
                },
              },
            ]),],
  controllers: [AppController],
  providers: [AppService,{
              provide: APP_INTERCEPTOR,
              scope: Scope.REQUEST,
              useClass: LoggingInterceptor,
            }],
})
export class AppModule {}
