import { EmailService } from './email.service';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
      HttpModule,
      MailerModule.forRoot({
        transport: {
          host: process.env.SERVER_EMAIL,
          port: Number(process.env.PORT_EMAIL),
          secure: false,
          auth: {
            user: '',
            pass: '',
          },
        },
        defaults: {
          from:'"Develop mobilsoft" <ceomobilsoft@outlook.com>',
        },
        template: {
          dir: './src/modulos/email/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
        // template: {
        //     dir: join(__dirname, 'templates'), // Usa join(__dirname, 'templates')
        //     adapter: new HandlebarsAdapter(),
        //     options: {
        //         strict: true,
        //     },
        // },
      })
    ],
    controllers: [EmailController],
    providers: [
        EmailService,
    ],
    exports: [EmailService, EmailModule],
})
export class EmailModule { }
