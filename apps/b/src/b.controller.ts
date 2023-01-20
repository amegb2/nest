import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BService } from './b.service';
import { Db } from 'mongodb';
import { SearchDto } from '../dto/SearchDto';

@Controller()
export class BController {
  constructor(private readonly bService: BService,@Inject('DATABASE_CONNECTION') private db: Db) {}

  @Get('search')
  search(@Query() range: SearchDto){
    return this.bService.find(new Date(range.from).toISOString(), new Date(range.to).toISOString());
  }

  @EventPattern('events')
  async hello(event: object) {
    this.bService.insert(event);
  }
}
