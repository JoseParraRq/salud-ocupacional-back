import { Injectable } from '@nestjs/common';
import conexion from './../../config/database';
import * as sql from 'mssql'; // Importación correcta
import { HistoriaCliniaDto } from './dto/historia-clinica.dto';

@Injectable()
export class HistoriaClinicaService {

    async createHistoriaClinica(historiaCliniaDto: HistoriaCliniaDto) {
        try {
            const conn = await conexion.getConnection('contratos')
            const pool = conn; // El `conn` ya es el pool de conexión.
            const result = await pool.request()  // Crea una solicitud SQL usando el pool

            result.input('id_orden', sql.Int, historiaCliniaDto.id_orden);
            result.input('id_aspirante', sql.Int, historiaCliniaDto.id_aspirante);
            result.input('id_usuario', sql.Int, historiaCliniaDto.id_usuario);
            result.input('fecha_creacion', sql.VarChar, historiaCliniaDto.fecha_creacion);
            result.input('jsonData', sql.VarChar(sql.MAX), historiaCliniaDto.jsonData);

            result.input('Accion', sql.VarChar(sql.MAX), 'guardar');
            // Ejecutar el procedimiento almacenado
            const resultado = await result.execute('sp_historia_clinica_aspirante');
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Se ha guardado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.log(error)
        }
    }


    async getHistoriaClinica(id_aspirante: number) {
        try {
            const conn = await conexion.getConnection('contratos')
            const pool = conn; // El `conn` ya es el pool de conexión.
            const result = await pool.request()  // Crea una solicitud SQL usando el pool
            result.input('Accion', sql.VarChar, 'listar');
            result.input('id_aspirante', sql.Int, id_aspirante);
            const resultado = await result.execute('sp_historia_clinica_aspirante');
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Se ha listado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.log(error)
        }
    }

    async getAspirantsAvaliableForHistory(){
        try {
            console.log("entre aqui")
            const conn = await conexion.getConnection('contratos')
            const pool = conn; // El `conn` ya es el pool de conexión.
            const result = await pool.request()  // Crea una solicitud SQL usando el pool
            result.input('Accion', sql.VarChar, 'listar_aspirantes');
            const resultado = await result.execute('sp_historia_clinica_aspirante');
            return {
                mensaje: 'Procedimiento ejecutado correctamente',
                descripcion: 'Se ha listado exitosamente',
                resultado: resultado.recordsets,
                status: true,
            };
        } catch (error) {
            console.log(error)
        }
    }
}
