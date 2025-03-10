import { Injectable } from '@nestjs/common';
import conexion from './../../config/database';
import * as sql from 'mssql'; // Importación correcta
import { AprovedOrderDTO, CreateOrderDTO } from './dto/orden.dto';
import { EmailService } from '../email/email.service';
import { SendOrdenToCompanyDto } from '../email/dto/sendOrdenToCompany.dto';

@Injectable()
export class OrdenService {
  constructor(private readonly emailService: EmailService) { }
  async getOrdenes() {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn; // El `conn` ya es el pool de conexión.
      const result = await pool.request(); // Crea una solicitud SQL usando el pool
      result.input('Accion', sql.Char(1), 'L');
      const resultado = await result.execute('sp_cli_order');
      return {
        mensaje: 'Procedimiento ejecutado correctamente',
        descripcion: 'Se ha listado exitosamente',
        resultado: resultado.recordsets,
        status: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async CreateOrden(createOrderDTO: CreateOrderDTO) {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn; // El `conn` ya es el pool de conexión.
      const result = await pool.request(); // Crea una solicitud SQL usando el pool

      result.input('aspirantId', sql.Int, createOrderDTO.aspirantId);
      result.input('bussineId', sql.Int, createOrderDTO.bussineId);
      result.input('date', sql.DateTime, createOrderDTO.date);
      result.input('typeOrder', sql.VarChar(10), createOrderDTO.typeOrder);
      result.input('userId', sql.Int, createOrderDTO.userId);
      result.input('prestadorId', sql.Int, createOrderDTO.prestadorId);
      

      //aqui agregue el manejo de la tvp de los cups
      const tvp_cups = new sql.Table('CupsType');
      tvp_cups.create = false;
      tvp_cups.columns.add('servicioId', sql.Int);
      tvp_cups.columns.add('servicioCode', sql.VarChar(255));

      createOrderDTO.cups.forEach(cup => {
        tvp_cups.rows.add(cup.servicioId, cup.servicioCode);
      });

      result.input('cups', tvp_cups);
      result.input('Accion', sql.Char(1), 'C');
      // Ejecutar el procedimiento almacenado
      const resultado = await result.execute('sp_cli_order');
      console.log(resultado?.recordsets[0])
      const dataForEmail = resultado?.recordsets[0][0];
      if (resultado.returnValue === 0) { // Verifica si el procedimiento se ejecutó correctamente
        // Envía el correo electrónico
        const sendOrdenToCompanyDto: SendOrdenToCompanyDto = {
          NombreUsuarioAsigna: dataForEmail.NombreUsuarioAsigna,
          NombreResponsable: dataForEmail.NombreResponsable,
          Url: `${process.env.URL_APP_PRODUCTION}/admin/expedition-order`,
          Email: dataForEmail.EmailEmpresaResponsable
        };
        await this.emailService.sendMailToOrden(sendOrdenToCompanyDto);

        return {
            mensaje: 'Procedimiento ejecutado correctamente',
            descripcion: 'Se ha guardado exitosamente',
            resultado: resultado.recordsets,
            status: true,
        };
    } else {
        // Manejar el error del procedimiento almacenado
        return {
            mensaje: 'Error al ejecutar el procedimiento',
            descripcion: 'No se pudo guardar la orden',
            resultado: resultado.recordsets,
            status: false,
        };
    }
    } catch (error) {
      console.log(error);
    }
  }

  async EditOrden(createOrderDTO: CreateOrderDTO) {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn; // El `conn` ya es el pool de conexión.
      const result = await pool.request(); // Crea una solicitud SQL usando el pool

      result.input('orderId', sql.Int, createOrderDTO.ordenId);
      result.input('aspirantId', sql.Int, createOrderDTO.aspirantId);
      result.input('bussineId', sql.Int, createOrderDTO.bussineId);
      result.input('date', sql.DateTime, createOrderDTO.date);
      result.input('typeOrder', sql.VarChar(10), createOrderDTO.typeOrder);
      result.input('userId', sql.Int, createOrderDTO.userId);
      result.input('prestadorId', sql.Int, createOrderDTO.prestadorId);
      result.input('Accion', sql.VarChar(250), 'Edit');

      //aqui agregue el manejo de la tvp de los cups
      const tvp_cups = new sql.Table('CupsType');
      tvp_cups.create = false;
      tvp_cups.columns.add('servicioId', sql.Int);
      tvp_cups.columns.add('servicioCode', sql.VarChar(255));

      createOrderDTO.cups.forEach(cup => {
        tvp_cups.rows.add(cup.servicioId, cup.servicioCode);
      });

      result.input('cups', tvp_cups);

      // Ejecutar el procedimiento almacenado
      const resultado = await result.execute('sp_cli_order');
      console.log(resultado?.recordsets[0])
      const dataForEmail = resultado?.recordsets[0][0];
      if (resultado.returnValue === 0) { // Verifica si el procedimiento se ejecutó correctamente
        // Envía el correo electrónico
        const sendOrdenToCompanyDto: SendOrdenToCompanyDto = {
          NombreUsuarioAsigna: dataForEmail.NombreUsuarioAsigna,
          NombreResponsable: dataForEmail.NombreResponsable,
          Url: `${process.env.URL_APP_PRODUCTION}/admin/expedition-order`,
          Email: dataForEmail.EmailEmpresaResponsable
        };
        await this.emailService.sendMailToOrden(sendOrdenToCompanyDto);

        return {
            mensaje: 'Procedimiento ejecutado correctamente',
            descripcion: 'Se ha guardado exitosamente',
            resultado: resultado.recordsets,
            status: true,
        };
    } else {
        // Manejar el error del procedimiento almacenado
        return {
            mensaje: 'Error al ejecutar el procedimiento',
            descripcion: 'No se pudo guardar la orden',
            resultado: resultado.recordsets,
            status: false,
        };
    }
    } catch (error) {
      console.log(error);
    }
  }

  
  async aprovedOrden(aprovedOrderDTO: AprovedOrderDTO) {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn; // El `conn` ya es el pool de conexión.
      const result = await pool.request(); // Crea una solicitud SQL usando el pool

      result.input('orderId', sql.Int, aprovedOrderDTO.ordenId);
      result.input('userAprovedId', sql.Int, aprovedOrderDTO.userAprovedId);
      result.input('Accion', sql.Char(1), 'A');
      // Ejecutar el procedimiento almacenado
      const resultado = await result.execute('sp_cli_order');
      console.log(resultado?.recordsets[0])
      const dataForEmail = resultado?.recordsets[0][0];
      if (resultado.returnValue === 0) { // Verifica si el procedimiento se ejecutó correctamente
        // Envía el correo electrónico
        const sendOrdenToCompanyDto: SendOrdenToCompanyDto = {
          NombreUsuarioAsigna: dataForEmail.NombreUsuarioAsigna,
          NombreResponsable: dataForEmail.NombreResponsable,
          Url: `${process.env.URL_APP_PRODUCTION}/admin/expedition-order`,
          Email: dataForEmail.EmailEmpresaResponsable
        };
        await this.emailService.sendMailOrdenAprobada(sendOrdenToCompanyDto);

        return {
            mensaje: 'Procedimiento ejecutado correctamente',
            descripcion: 'Se ha guardado exitosamente',
            resultado: resultado.recordsets,
            status: true,
        };
    } else {
        // Manejar el error del procedimiento almacenado
        return {
            mensaje: 'Error al ejecutar el procedimiento',
            descripcion: 'No se pudo guardar la orden',
            resultado: resultado.recordsets,
            status: false,
        };
    }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(ordenId: number) {
    try {
        const conn = await conexion.getConnection('contratos');
        const pool = conn;
        const result = await pool.request();
        console.log(ordenId)
        result.input('orderId', sql.Int, ordenId);
        result.input('Accion', sql.VarChar(50), 'Orden_By_Id');

        const resultado = await result.execute('sp_cli_order');
        return {
            mensaje: 'Procedimiento ejecutado correctamente',
            descripcion: 'Se ha actualizado exitosamente',
            resultado: resultado.recordsets,
            status: true,
        };
    } catch (error) {
        console.log(error);
        return {
            mensaje: 'Error al obtener la orden',
            descripcion: error.message,
            resultado: null,
            status: false,
        };
    }
}

async getOrdenesAproved() {
  try {
    const conn = await conexion.getConnection('contratos');
    const pool = conn; // El `conn` ya es el pool de conexión.
    const result = await pool.request(); // Crea una solicitud SQL usando el pool
    result.input('Accion', sql.VarChar(50), 'Orden_Aprobadas');
    const resultado = await result.execute('sp_cli_order');
    return {
      mensaje: 'Procedimiento ejecutado correctamente',
      descripcion: 'Se ha listado exitosamente',
      resultado: resultado.recordsets,
      status: true,
    };
  } catch (error) {
    console.log(error);
  }
}
}
