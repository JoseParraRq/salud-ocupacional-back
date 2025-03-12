import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultoriosService } from './consultorios.service';

@ApiTags('Consultorios')
@Controller('api/consultorios')
export class ConsultoriosController {
  constructor(private readonly consultoriosServ: ConsultoriosService) {}

  @Post('/')
  listar(@Body() body: any) {
    return this.consultoriosServ.listar(body);
  }

  @Post('/crear/')
  guardar(@Body() body: any) {
    return this.consultoriosServ.guardar(body);
  }

  @Post('/editar/')
  editar(@Body() body: any) {
    return this.consultoriosServ.editar(body);
  }

  @Post('/estado/')
  estado(@Body() body: any) {
    return this.consultoriosServ.estado(body);
  }
}
