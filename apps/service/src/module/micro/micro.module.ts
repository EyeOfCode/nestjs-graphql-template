import { Module } from '@nestjs/common';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'test_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [MicroService],
  controllers: [MicroController],
  exports: [MicroService],
})
export class MicroModule {}
