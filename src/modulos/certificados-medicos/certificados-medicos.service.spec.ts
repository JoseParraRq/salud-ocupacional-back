import { Test, TestingModule } from '@nestjs/testing';
import { CertificadosMedicosService } from './certificados-medicos.service';

describe('CertificadosMedicosService', () => {
  let service: CertificadosMedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificadosMedicosService],
    }).compile();

    service = module.get<CertificadosMedicosService>(CertificadosMedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
