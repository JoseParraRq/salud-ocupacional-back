import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CertificadosMedicosService } from './certificados-medicos.service';
import { CreateCertificadoMedicoDTO } from './dto/certificados-medicos.dto';

@ApiTags('certificados-medicos')
@Controller('certificados-medicos')
export class CertificadosMedicosController {
    constructor(private readonly certificadosMedicosService: CertificadosMedicosService) {}

  @Get('/validApplicantsCertificate')
  findAll() {
    return this.certificadosMedicosService.validApplicantsCertificate();
  }

  @Post('/createCertificate')
  createCertificate(@Body() createCertificadoMedicoDTO: CreateCertificadoMedicoDTO) {
    return this.certificadosMedicosService.createCertificate(createCertificadoMedicoDTO);
  }
}
