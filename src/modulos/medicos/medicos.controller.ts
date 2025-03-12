import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedicosService } from './medicos.service';

@ApiTags('Medicos')
@Controller('api/medicos')
export class MedicosController {
  constructor(private readonly medicosServ: MedicosService) {}

  @Post('/')
  listar(@Body() body: any) {
    return this.medicosServ.listar(body);
  }

  @Post('/crear/')
  guardar(@Body() body: any) {
    return this.medicosServ.guardar(body);
  }

  @Post('/editar/')
  editar(@Body() body: any) {
    return this.medicosServ.editar(body);
  }

  @Post('/estado/')
  estado(@Body() body: any) {
    return this.medicosServ.estado(body);
  }

  @Post('/horario/')
  horario(@Body() body: any) {
    return this.medicosServ.horario(body);
  }
}
