import { Module } from '@nestjs/common';
import { BController } from './b.controller';
import { BService } from './b.service';
import { DatabaseModule } from '../../../libs/common/src/index';

@Module({
  imports: [DatabaseModule],
  controllers: [BController],
  providers: [BService],
})
export class BModule {}
