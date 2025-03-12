import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitasService } from './citas.service';

@ApiTags('Citas')
@Controller('api/citas')
export class CitasController {
  constructor(private readonly citasServ: CitasService) {}

  @Post('/')
  listar(@Body() body: any) {
    return this.citasServ.listar(body);
  }

  @Post('/crear/')
  guardar(@Body() body: any) {
    return this.citasServ.guardar(body);
  }

  @Post('/editar/')
  editar() {
    return this.citasServ.editar();
  }

  @Post('/estado/')
  estado(@Body() body: any) {
    return this.citasServ.estado(body);
  }

  @Post('/especialidad/')
  especialidad(@Body() body: any) {
    return this.citasServ.especialidad(body);
  }

  @Post('/consultarCita/')
  consultarCita(@Body() body: any) {
    return this.citasServ.consultarCita(body);
  }
}
