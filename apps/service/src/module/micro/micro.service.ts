import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MicroService {
  constructor(@Inject('MICRO_SERVICE') private readonly client: ClientProxy) {}

  getMicroservice(): Promise<string> {
    const pattern = 'test-microservice';
    const payload = 'success to connect';
    return this.client.send<string>(pattern, payload).toPromise();
  }
}
