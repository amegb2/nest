import { Test, TestingModule } from '@nestjs/testing';
import { BController } from './b.controller';
import { BService } from './b.service';

describe('BController', () => {
  let bController: BController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BController],
      providers: [BService],
    }).compile();

    bController = app.get<BController>(BController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bController.getHello()).toBe('Hello World!');
    });
  });
});
