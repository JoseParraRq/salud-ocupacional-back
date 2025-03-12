import { Injectable } from '@nestjs/common';
import conexion from './../../config/database';
import * as sql from 'mssql'; // Importación correcta
import { CreateCertificadoMedicoDTO } from './dto/certificados-medicos.dto';
import { EmailService } from '../email/email.service';
import { SendCertificateToCompanyDto } from '../email/dto/sendOrdenToCompany.dto';


@Injectable()
export class CertificadosMedicosService {
  constructor(private readonly emailService: EmailService) { }

  async validApplicantsCertificate() {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn; // El `conn` ya es el pool de conexión.
      const result = await pool.request(); // Crea una solicitud SQL usando el pool
      result.input('Accion', sql.VarChar, 'Listar');
      const resultado = await result.execute('sp_cli_certificados_medicos');
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

  async createCertificate(createCertificadoMedicoDTO: CreateCertificadoMedicoDTO) {
    try {
      const conn = await conexion.getConnection('contratos');
      const pool = conn;
      const result = await pool.request();

      result.input('orderId', sql.Int, createCertificadoMedicoDTO.orderId);
      result.input('AspiranteEmpleadoId', sql.Int, createCertificadoMedicoDTO.AspiranteEmpleadoId);
      result.input('userId', sql.Int, createCertificadoMedicoDTO.userId);
      result.input('epps', sql.VarChar, createCertificadoMedicoDTO.epps);
      result.input('paraClinicos', sql.VarChar, createCertificadoMedicoDTO.paraClinicos);
      result.input('paraClinicosRemision', sql.VarChar, createCertificadoMedicoDTO.paraClinicosRemision);
      result.input('paraClinicosReubicacion', sql.VarChar, createCertificadoMedicoDTO.paraClinicosReubicacion);
      result.input('conceptoMedico', sql.VarChar, createCertificadoMedicoDTO.conceptoMedico);
      result.input('urlFile', sql.VarChar, createCertificadoMedicoDTO.UrlFile);
      // Crear la TVP para inclusion
      const tvpInclusion = new sql.Table('InclusionType');
      tvpInclusion.create = false;
      tvpInclusion.columns.add('cardiovascular', sql.Bit);
      tvpInclusion.columns.add('respiratorio', sql.Bit);
      tvpInclusion.columns.add('ergonomico', sql.Bit);
      tvpInclusion.columns.add('biologicos', sql.Bit);
      tvpInclusion.columns.add('dermatologico', sql.Bit);
      tvpInclusion.columns.add('visual', sql.Bit);
      tvpInclusion.columns.add('estilosDeVida', sql.Bit);
      tvpInclusion.columns.add('psicosocial', sql.Bit);
      tvpInclusion.columns.add('otros', sql.VarChar(sql.MAX));

      // Agregar los datos de inclusion a la TVP
      createCertificadoMedicoDTO.inclusion.forEach((inclusion) => {
        tvpInclusion.rows.add(inclusion.cardiovascular, inclusion.respiratorio, inclusion.ergonomico, inclusion.biologicos, inclusion.dermatologico, inclusion.visual, inclusion.estilosDeVida, inclusion.psicosocial, inclusion.otros);
      });


      result.input('inclusion', tvpInclusion);

      result.input('Accion', sql.VarChar, 'Crear');

      const resultado = await result.execute('sp_cli_certificados_medicos');

      console.log(resultado?.recordsets[0])
      const dataForEmail = resultado?.recordsets[0][0];
      if (resultado.returnValue === 0) { // Verifica si el procedimiento se ejecutó correctamente
        // Envía el correo electrónico
        const sendCertificateToCompanyDto: SendCertificateToCompanyDto = {
          NombreUsuarioAsigna: dataForEmail.NombreUsuarioAsigna,
          NombreResponsable: dataForEmail.NombreResponsable,
          NombrePersona: dataForEmail.NombrePersona,
          Url: dataForEmail?.Url,
          Email: dataForEmail.EmailEmpresaResponsable
        };
        await this.emailService.sendMailCertificateToCompany(sendCertificateToCompanyDto);

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
      console.error(error);
      return {
        mensaje: 'Error inesperado al crear el certificado médico',
        descripcion: error.message,
        resultado: null,
        status: false,
      };
    }
  }
}


