import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';

@Injectable()
export class AlmacenesService {
  async listar(body: any): Promise<any> {
    const conn = await conexion.getConnection();
    const pool = conn;
    try {
      const request = pool.request();
      request.input('id_user', sql.Int, body.id_user);
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('estado', sql.Int, body.estado);
      request.input('accion', sql.Char(1), body.accion);

      const result = await request.execute('sp_almacenes');

      return {
        success: true,
        message: 'Procedimiento ejecutado correctamente',
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
        message: 'Error al ejecutar el procedimiento',
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
      const request = pool.request();
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('nomalm', sql.VarChar(50), body.nomalm);
      request.input('diralm', sql.VarChar(50), body.diralm);
      request.input('telalm', sql.VarChar(50), body.telalm);
      request.input('coddane', sql.VarChar(10), body.coddane);
      request.input('ciualm', sql.VarChar(50), body.ciualm);
      request.input('prefijo', sql.Char(3), body.prefijo);
      request.input('plazo', sql.Int, body.plazo);
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'G');

      const result = await request.execute('sp_almacenes');

      return {
        success: true,
        message: 'Procedimiento ejecutado correctamente',
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
        message: 'Error al ejecutar el procedimiento',
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
      const request = pool.request();
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('nomalm', sql.VarChar(50), body.nomalm);
      request.input('diralm', sql.VarChar(50), body.diralm);
      request.input('telalm', sql.VarChar(50), body.telalm);
      request.input('coddane', sql.VarChar(10), body.coddane);
      request.input('ciualm', sql.VarChar(50), body.ciualm);
      request.input('prefijo', sql.Char(2), body.prefijo);
      request.input('plazo', sql.Int, body.plazo);
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'A');

      const result = await request.execute('sp_almacenes');

      return {
        success: true,
        message: 'Procedimiento ejecutado correctamente',
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
        message: 'Error al ejecutar el procedimiento',
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
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'E');

      const result = await request.execute('sp_almacenes');

      return {
        success: true,
        message: 'Procedimiento ejecutado correctamente',
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
        message: 'Error al ejecutar el procedimiento',
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
