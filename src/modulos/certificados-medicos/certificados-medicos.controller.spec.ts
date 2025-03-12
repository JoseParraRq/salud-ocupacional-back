import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosMedicosController } from './certificados-medicos.controller';

describe('CertificadosMedicosController', () => {
  let controller: CertificadosMedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificadosMedicosController],
    }).compile();

    controller = module.get<CertificadosMedicosController>(CertificadosMedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
