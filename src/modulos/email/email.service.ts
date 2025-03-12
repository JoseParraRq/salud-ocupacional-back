import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendCertificateToCompanyDto, SendOrdenToCompanyDto } from './dto/sendOrdenToCompany.dto';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService, private readonly httpService: HttpService) { }
  private async emailControl(transport: string) {
    try {
      this.mailerService.addTransporter(transport, {
        auth: { user: process.env.USER_EMAIL, pass: process.env.PASS_EMAIL },
        host: process.env.SERVER_EMAIL,
        secure: true,
        port: parseInt(process.env.PORT_EMAIL)
      });
      return true

    } catch (error) {
      return false
    }
  }

  async sendMailToOrden(sendOrdenToCompanyDto: SendOrdenToCompanyDto) {
    const config = await this.emailControl('SendTaskMail')
    try {
      console.log(sendOrdenToCompanyDto)
      const send = await this.mailerService.sendMail({
        transporterName: 'SendTaskMail',
        to: sendOrdenToCompanyDto.Email,
        from: '"Develop mobilsoft" <proyectos@mobilsoft.co>', // override default from
        subject: 'Asignacion de tarea - contratacion',
        template: 'orden-notificacion',
        context: { // ✏️ filling curly brackets with content
          NombreUsuarioAsigna: sendOrdenToCompanyDto.NombreUsuarioAsigna,
          NombreResponsable: sendOrdenToCompanyDto.NombreResponsable,
          url: sendOrdenToCompanyDto.Url,
        },
      });
      console.log(send)
      return send
    } catch (error) {
      console.error(error);

    }
  }

  async sendMailOrdenAprobada(sendOrdenEmailDto: SendOrdenToCompanyDto) {
    const config = await this.emailControl('SendAprobacionMail');
    try {
      console.log(sendOrdenEmailDto);
      const send = await this.mailerService.sendMail({
        transporterName: 'SendAprobacionMail',
        to: sendOrdenEmailDto.Email,
        from: '"Develop mobilsoft" <proyectos@mobilsoft.co>',
        subject: 'Orden Médica Aprobada',
        template: 'orden-aprobada',
        context: {
          NombreUsuarioAsigna: sendOrdenEmailDto.NombreUsuarioAsigna,
          NombreResponsable: sendOrdenEmailDto.NombreResponsable,
          url: sendOrdenEmailDto.Url,
        },
      });
      console.log('Correo de orden aprobada enviado:', send);
      return sendOrdenEmailDto;
    } catch (error) {
      console.error('Error al enviar el correo de orden aprobada:', error);
    }
  }

  async sendMailCertificateToCompany(sendCertificateToCompanyDto: SendCertificateToCompanyDto) {
    const config = await this.emailControl('SendCertificateMail');
    try {
     
      const send = await this.mailerService.sendMail({
        transporterName: 'SendCertificateMail',
        to: sendCertificateToCompanyDto.Email,
        from: '"Develop mobilsoft" <proyectos@mobilsoft.co>',
        subject: 'Certificado Médico Creado',
        template: 'certificado-creado',
        // attachments: [ //aqui colocar ese file
        //   {
        //     path: sendCertificateToCompanyDto.Url,
        //     filename: "Certificado-Medico.pdf"
        //   }
        // ],
        context: {
          NombreUsuarioAsigna: sendCertificateToCompanyDto.NombreUsuarioAsigna,
          NombreResponsable: sendCertificateToCompanyDto.NombreResponsable,
          url: sendCertificateToCompanyDto.Url,
          NombrePersona: sendCertificateToCompanyDto.NombrePersona,
        },
      });
    
      console.log('Correo de certificado creado enviado:', send);

      return send;
    } catch (error) {
      console.error('Error al enviar el correo de certificado creado:', error);
    }
  }

}
