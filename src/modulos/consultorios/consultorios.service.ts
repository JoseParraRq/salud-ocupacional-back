import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';

@Injectable()
export class ConsultoriosService {
  async listar(body: any): Promise<any> {
    const conn = await conexion.getConnection();
    const pool = conn;
    try {
      const request = pool.request();
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'L');

      const result = await request.execute('sp_consultorios');

      return {
        success: true,
        message: 'Consultorios listados correctamente',
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
        message: 'Error al listar los consultorios',
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
    const conn = await conexion.getConnection();
    const pool = conn;
    try {
      if (!body || !body.codigo || !body.codalm || !body.nombre) {
        throw new BadRequestException(
          'Código, código de almacén y nombre son requeridos',
        );
      }

      const request = pool.request();
      request.input('codigo', sql.VarChar(5), body.codigo);
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('nombre', sql.Text, body.nombre);
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'G');

      const result = await request.execute('sp_consultorios');

      return {
        success: true,
        message: 'Consultorio guardado correctamente',
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
        message: 'Error al guardar el consultorio',
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
    const conn = await conexion.getConnection();
    const pool = conn;
    try {
      if (!body || !body.codalm || !body.codigo || !body.nombre) {
        throw new BadRequestException(
          'Código, código de almacén y nombre son requeridos',
        );
      }

      const request = pool.request();
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('codigo', sql.VarChar(5), body.codigo);
      request.input('nombre', sql.Text, body.nombre);
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'A');

      const result = await request.execute('sp_consultorios');

      return {
        success: true,
        message: 'Consultorio editado correctamente',
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
        message: 'Error al editar el consultorio',
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
      if (!body || !body.codigo || body.estado === undefined) {
        throw new BadRequestException('Código y estado son requeridos');
      }

      const request = pool.request();
      request.input('codigo', sql.VarChar(5), body.codigo);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'E');

      const result = await request.execute('sp_consultorios');

      return {
        success: true,
        message: 'Estado del consultorio actualizado correctamente',
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
        message: 'Error al actualizar el estado del consultorio',
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
