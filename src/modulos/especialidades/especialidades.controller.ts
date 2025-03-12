import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EspecialidadesService } from './especialidades.service';

@ApiTags('Especialidades')
@Controller('api/especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesServ: EspecialidadesService) {}

  @Post('/')
  listar(@Body() body: any) {
    return this.especialidadesServ.listar(body);
  }

  @Post('/crear/')
  guardar(@Body() body: any) {
    return this.especialidadesServ.guardar(body);
  }

  @Post('/editar/')
  editar(@Body() body: any) {
    return this.especialidadesServ.editar(body);
  }

  @Post('/estado/')
  estado(@Body() body: any) {
    return this.especialidadesServ.estado(body);
  }
}
