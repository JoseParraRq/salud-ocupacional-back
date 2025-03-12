import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlmacenesService } from './almacenes.service';

@ApiTags('Almacenes')
@Controller('api/almacenes')
export class AlmacenesController {
  constructor(private readonly almacenesServ: AlmacenesService) {}

  @Post('/')
  listar(@Body() body: any) {
    return this.almacenesServ.listar(body);
  }

  @Post('/crear/')
  guardar(@Body() body: any) {
    return this.almacenesServ.guardar(body);
  }

  @Post('/editar/')
  editar(@Body() body: any) {
    return this.almacenesServ.editar(body);
  }
}
