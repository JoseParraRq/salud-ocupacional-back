import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';

@Injectable()
export class MedicosService {
  async listar(body: any) {
    const conn = await conexion.getConnection('contratos');
    const pool = conn;
    try {
      const request = pool.request();

      request.input('id', sql.Int, body.id);
      request.input('estado', sql.Bit, body.estado);
      request.input('id_especialidad_fk', sql.Int, body.id_especialidad_fk);
      request.input('accion', sql.Char(2), body.accion);
      const result = await request.execute('sp_medicos');

      return {
        success: true,
        message: 'Procedimiento ejecutado correctamente',
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
        message: 'Error al listar medicos',
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
    const conn = await conexion.getConnection('contratos');
    const pool = conn;
    try {
      if (!body) {
        throw new BadRequestException('Datos inválidos');
      }

      const request = pool.request();

      // Especialidades
      const tableEspecialidades = new sql.Table();
      tableEspecialidades.columns.add('id_medico_fk', sql.Int);
      tableEspecialidades.columns.add('id_especialidad_fk', sql.Int);
      tableEspecialidades.columns.add('estado', sql.Bit);

      body.especialidades?.forEach((esp: any) => {
        tableEspecialidades.rows.add(0, esp.id_especialidad_fk, 1);
      });

      // Horarios
      const tableHorarios = new sql.Table();
      tableHorarios.columns.add('id_medico_fk', sql.Int);
      tableHorarios.columns.add('id_consultorio_fk', sql.Int);
      tableHorarios.columns.add('dia', sql.Int);
      tableHorarios.columns.add('entrada', sql.VarChar(10));
      tableHorarios.columns.add('salida', sql.VarChar(10));
      tableHorarios.columns.add('estado', sql.Bit);

      body.horarios?.forEach((horario: any) => {
        tableHorarios.rows.add(
          0,
          Number(horario.id_consultorio_fk),
          horario.dia,
          horario.entrada,
          horario.salida,
          1,
        );
      });

      request.input('id_perfil_fk', sql.Int, body.id_perfil_fk);
      request.input('documento', sql.VarChar(15), body.documento);
      request.input('primer_nombre', sql.VarChar(50), body.primer_nombre);
      request.input('segundo_nombre', sql.VarChar(50), body.segundo_nombre);
      request.input('primer_apellido', sql.VarChar(50), body.primer_apellido);
      request.input('segundo_apellido', sql.VarChar(50), body.segundo_apellido);
      request.input('telefono', sql.VarChar(15), body.telefono);
      request.input('usuario', sql.VarChar(50), body.usuario);
      request.input('email', sql.VarChar(50), body.email);
      request.input('pass', sql.VarChar(100), body.password);
      request.input('estado', sql.Bit, 1);
      request.input('especialidades', sql.TVP, tableEspecialidades);
      request.input('horarios', sql.TVP, tableHorarios);
      request.input('accion', sql.Char(1), 'G');

      const result = await request.execute('sp_medicos');

      return {
        success: true,
        message: 'Médico guardado correctamente',
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
        message: 'Error al guardar el médico',
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
    const conn = await conexion.getConnection('contratos');
    const pool = conn;
    try {
      if (!body || !body.id) {
        throw new BadRequestException('Datos inválidos o ID requerido');
      }

      const request = pool.request();

      // Especialidades
      const tableEspecialidades = new sql.Table();
      tableEspecialidades.columns.add('id_medico_fk', sql.Int);
      tableEspecialidades.columns.add('id_especialidad_fk', sql.Int);
      tableEspecialidades.columns.add('estado', sql.Bit);

      body.especialidades?.forEach((esp: any) => {
        tableEspecialidades.rows.add(body.id, esp.id_especialidad_fk, 1);
      });

      // Horarios
      const tableHorarios = new sql.Table();
      tableHorarios.columns.add('id_medico_fk', sql.Int);
      tableHorarios.columns.add('id_consultorio_fk', sql.Int);
      tableHorarios.columns.add('dia', sql.Int);
      tableHorarios.columns.add('entrada', sql.VarChar(10));
      tableHorarios.columns.add('salida', sql.VarChar(10));
      tableHorarios.columns.add('estado', sql.Bit);

      body.horarios?.forEach((horario: any) => {
        tableHorarios.rows.add(
          body.id,
          Number(horario.id_consultorio_fk),
          horario.dia,
          horario.entrada,
          horario.salida,
          1,
        );
      });

      request.input('id', sql.Int, body.id);
      request.input('id_perfil_fk', sql.Int, body.id_perfil_fk);
      request.input('documento', sql.VarChar(15), body.documento);
      request.input('primer_nombre', sql.VarChar(50), body.primer_nombre);
      request.input('segundo_nombre', sql.VarChar(50), body.segundo_nombre);
      request.input('primer_apellido', sql.VarChar(50), body.primer_apellido);
      request.input('segundo_apellido', sql.VarChar(50), body.segundo_apellido);
      request.input('telefono', sql.VarChar(15), body.telefono);
      request.input('email', sql.VarChar(50), body.email);
      request.input('pass', sql.VarChar(100), body.password);
      request.input('estado', sql.Bit, 1);
      request.input('especialidades', sql.TVP, tableEspecialidades);
      request.input('horarios', sql.TVP, tableHorarios);
      request.input('accion', sql.Char(1), 'A');

      const result = await request.execute('sp_medicos');

      return {
        success: true,
        message: 'Médico actualizado correctamente',
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
        message: 'Error al actualizar el médico',
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
    const conn = await conexion.getConnection('contratos');
    const pool = conn;
    try {
      if (!body || body.id === undefined || body.estado === undefined) {
        throw new BadRequestException('ID y estado son requeridos');
      }

      const request = pool.request();
      request.input('id', sql.Int, body.id);
      request.input('estado', sql.Bit, body.estado);
      request.input('accion', sql.Char(1), 'E');

      const result = await request.execute('sp_medicos');

      return {
        success: true,
        message: 'Estado actualizado correctamente',
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
        message: 'Error al actualizar el estado del médico',
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

  async horario(body: any): Promise<any> {
    const conn = await conexion.getConnection('contratos');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('id_medico_fk', sql.Int, Number(body.medico));
      request.input('id_especialidad_fk', sql.Int, Number(body.especialidad));
      request.input('dia', sql.Int, Number(body.dia));
      request.input('hora', sql.VarChar(10), body.hora);
      request.input('accion', sql.Char(2), body.accion);

      const result = await request.execute('sp_horario_medico');

      return {
        success: true,
        message: 'Horario actualizado correctamente',
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
        message: 'Error al actualizar el horario del médico',
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
