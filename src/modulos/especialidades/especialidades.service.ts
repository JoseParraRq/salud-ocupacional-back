import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';

@Injectable()
export class EspecialidadesService {
  async listar(body: any): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'L');

      const result = await request.execute('sp_especialidades');

      return {
        success: true,
        message: 'Especialidades listadas correctamente',
        data: {
          affectedRows: result.rowsAffected,
          records: result.recordsets[0],
        },
        status: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Error al listar las especialidades',
        error: error.message,
        status: 500,
      });
    } finally {
      if (conn) {
        await conn.close().catch((err) => {
          console.error('Error cerrando conexión:', err);
        });
      }
    }
  }

  async guardar(body: any): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      if (!body || !body.nombre) {
        throw new BadRequestException('El nombre es requerido');
      }

      const request = pool.request();
      request.input('nombre', sql.Text, body.nombre);
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'G');

      const result = await request.execute('sp_especialidades');

      return {
        success: true,
        message: 'Especialidad guardada correctamente',
        data: {
          affectedRows: result.rowsAffected,
          records: result.recordsets,
        },
        status: 201,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Error al guardar la especialidad',
        error: error.message,
        status: 500,
      });
    } finally {
      if (conn) {
        await conn.close().catch((err) => {
          console.error('Error cerrando conexión:', err);
        });
      }
    }
  }

  async editar(body: any): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      if (
        !body ||
        body.id === undefined ||
        !body.nombre ||
        body.estado === undefined
      ) {
        throw new BadRequestException('ID, nombre y estado son requeridos');
      }

      const request = pool.request();
      request.input('id', sql.Int, body.id);
      request.input('nombre', sql.Text, body.nombre);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'A');

      const result = await request.execute('sp_especialidades');

      return {
        success: true,
        message: 'Especialidad editada correctamente',
        data: {
          affectedRows: result.rowsAffected,
          records: result.recordsets,
        },
        status: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Error al editar la especialidad',
        error: error.message,
        status: 500,
      });
    } finally {
      if (conn) {
        await conn.close().catch((err) => {
          console.error('Error cerrando conexión:', err);
        });
      }
    }
  }

  async estado(body: any): Promise<any> {
    const conn = await conexion.getConnection();
    const pool = conn;
    try {
      const request = pool.request();
      request.input('id', sql.Int, body.id);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'E');

      const result = await request.execute('sp_especialidades');

      return {
        success: true,
        message: 'Estado del especialista actualizado correctamente',
        data: {
          affectedRows: result.rowsAffected,
          records: result.recordsets,
        },
        status: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Error al actualizar el estado del especialista',
        error: error.message,
        status: 500,
      });
    } finally {
      if (conn) {
        await conn.close().catch((err) => {
          console.error('Error cerrando conexión:', err);
        });
      }
    }
  }
}
