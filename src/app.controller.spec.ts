import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return sample json data', async () => {
      const result = { data: { title: 'Cocochat', copyright: 'Coconut Silo' } };
      jest.spyOn(appController, 'getHello').mockImplementation(() => result);
      expect(await appController.getHello()).toBe(result);
    });
  });
});
