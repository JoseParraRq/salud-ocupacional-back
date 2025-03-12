import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import conexion from '../../config/database';
import * as sql from 'mssql';

@Injectable()
export class CitasService {
  async listar(body: any): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('estado', sql.Int, body.estado);
      request.input('id_medico_fk', sql.Int, body.medico);
      request.input('id_paciente_fk', sql.Int, body.id_paciente_fk);
      request.input('id_especialidad_fk', sql.Int, body.especialidad);
      request.input('accion', sql.Char(1), body.accion);

      const result = await request.execute('sp_citas');

      return {
        success: true,
        message: 'Citas listadas correctamente',
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
        message: 'Error al listar las citas',
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
      const request = pool.request();
      request.input('codalm', sql.Char(3), body.codalm);
      request.input('codcup', sql.VarChar(10), body.codcup);
      request.input('id_paciente_fk', sql.Int, body.id_paciente_fk);
      request.input(
        'documento_paciente',
        sql.VarChar(15),
        body.documento_paciente,
      );
      request.input(
        'primer_nombre_paciente',
        sql.VarChar(25),
        body.primer_nombre_paciente,
      );
      request.input(
        'segundo_nombre_paciente',
        sql.VarChar(25),
        body.segundo_nombre_paciente,
      );
      request.input(
        'primer_apellido_paciente',
        sql.VarChar(25),
        body.primer_apellido_paciente,
      );
      request.input(
        'segundo_apellido_paciente',
        sql.VarChar(25),
        body.segundo_apellido_paciente,
      );
      request.input(
        'telefono_paciente',
        sql.VarChar(15),
        body.telefono_paciente,
      );
      request.input('email_paciente', sql.VarChar(100), body.email_paciente);
      request.input('id_medico_fk', sql.Int, body.id_medico_fk);
      request.input('id_especialidad_fk', sql.Int, body.id_especialidad_fk);
      request.input('id_consultorio_fk', sql.Int, body.id_consultorio_fk);
      request.input('id_indicador_fk', sql.Int, body.id_indicador_fk);
      request.input('start', sql.VarChar, body.start);
      request.input('data', sql.VarChar, body.data);
      request.input('motivo', sql.NVarChar(255), body.motivo);
      request.input('duracion', sql.VarChar(10), body.duracion);
      request.input('estado', sql.Int, body.estado);
      request.input('id_usuario_fk', sql.Int, body.id_usuario_fk);
      request.input('accion', sql.Char(1), 'G');

      const result = await request.execute('sp_citas');

      return {
        success: true,
        message: 'Cita guardada correctamente',
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
        message: 'Error al guardar la cita',
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

  async editar(): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('estado', sql.Bit, 1);
      request.input('accion', sql.Char(1), 'A');

      const result = await request.execute('sp_citas');

      return {
        success: true,
        message: 'Cita actualizada correctamente',
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
        message: 'Error al actualizar la cita',
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
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('id', sql.Int, body.id);
      request.input('estado', sql.Int, body.estado);
      request.input('start', sql.VarChar, body.start);
      request.input('accion', sql.Char(1), 'E');

      const result = await request.execute('sp_citas');

      return {
        success: true,
        message: 'Estado de cita actualizado correctamente',
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
        message: 'Error al actualizar el estado de la cita',
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

  async especialidad(body: any): Promise<any> {
    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input('id_medico_fk', sql.Int, body.medico);
      request.input('accion', sql.Char(1), 'O');

      const result = await request.execute('sp_citas');

      return {
        success: true,
        message: 'Especialidad obtenida correctamente',
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
        message: 'Error al obtener la especialidad',
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

  async consultarCita(body: any): Promise<any> {
    const accion = !body.queryResult.parameters.eventCita ? 'F' : 'R';
    const estado =
      body.queryResult.parameters.eventCita === 'cancelar' ? 6 : null;

    const conn = await conexion.getConnection('');
    const pool = conn;
    try {
      const request = pool.request();
      request.input(
        'documento_paciente',
        sql.VarChar(15),
        body.queryResult.parameters.identificacion.toString(),
      );
      request.input('accion', sql.Char(1), accion);
      request.input('estado', sql.Int, estado);

      const result = await request.execute('sp_citas');

      if (!body.queryResult.parameters.eventCita) {
        if (result.recordsets[0].length > 0) {
          const resp = result.recordsets[0][0];
          const citasActivas = result.recordsets[0].filter(
            (item) => item.estado == '1' || item.estado == '2',
          );

          if (citasActivas.length > 0) {
            const d = new Date(resp.start);
            const fecha = `${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`;
            const hora = d.getHours().toString().padStart(2, '0');
            const minutos = d.getMinutes().toString().padStart(2, '0');

            return {
              fulfillmentText: `Hola ${resp.primer_nombre} ${resp.primer_apellido}, tienes una cita programada para el ${fecha} a las ${hora}:${minutos}. ¿Desea cancelar o reprogramar la cita?`,
            };
          } else {
            return {
              fulfillmentText: `Hola ${resp.primer_nombre} ${resp.primer_apellido}, no tienes citas programadas. ¿Deseas hacer una?`,
              fulfillmentMessages: [
                {
                  card: {
                    title: 'card title',
                    subtitle: 'card text',
                    imageUri:
                      'https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png',
                    buttons: [
                      {
                        text: 'button text',
                        postback: 'https://assistant.google.com/',
                      },
                    ],
                  },
                },
              ],
            };
          }
        } else {
          return {
            fulfillmentText:
              'Usted no se encuentra registrado. Si desea hacerlo, puede acceder a este link y digitar la información.',
          };
        }
      } else {
        return {
          fulfillmentText: `Ok, su cita se pudo ${body.queryResult.parameters.eventCita}. ¿Desea hacer otra solicitud?`,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        fulfillmentText:
          'Oh! Lo siento, obtuve un error al consultar. Vuelva a intentar más tarde.',
      };
    } finally {
      if (conn) {
        await conn
          .close()
          .catch((err) => console.error('Error cerrando conexión:', err));
      }
    }
  }
}
