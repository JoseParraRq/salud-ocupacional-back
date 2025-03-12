import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as mssql from 'mssql';
import conexion from './../../config/database';
import { HistoriaCliniaDto } from './dto/historia-clinica.dto';
import { HistoriaClinicaService } from './historia-clinica.service';

@Controller('historia-clinica')
@ApiTags('HistoriaClinica')
export class HistoriaClinicaController {
    constructor(private readonly historiaClinicaService: HistoriaClinicaService) {}

    @Post()
    async crearHistoriaClinica(@Body() historiaCliniaDto: HistoriaCliniaDto) {
        try {
            return await this.historiaClinicaService.createHistoriaClinica(historiaCliniaDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/:id_aspirante')
    async getHistoriaClinica(@Param('id_aspirante') id_aspirante: number) {
        try {
            return await this.historiaClinicaService.getHistoriaClinica(id_aspirante);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/aspirantes/validos')
    async getAspirantsAvaliableForHistory() {
        try {
            return await this.historiaClinicaService.getAspirantsAvaliableForHistory();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
