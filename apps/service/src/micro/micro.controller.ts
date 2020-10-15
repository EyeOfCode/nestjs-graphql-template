import { Controller, Get } from '@nestjs/common';
import { MicroService } from './micro.service';

@Controller('micro')
export class MicroController {
  constructor(private readonly microService: MicroService) {}

  @Get()
  findAll(): Promise<string> {
    return this.microService.getMicroservice();
  }
}
