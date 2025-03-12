import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { corsOptionsDelegate } from './config/cors/whilelist.config';
import { config } from 'dotenv';
import connection from './config/database'; // Ruta del archivo de conexión

config();

async function bootstrap() {
  
  
  try {
    await connection.getConnection('ocupacional');
    console.log('Conexión a la base de datos realizada con éxito');
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar a la base de datos
  }

  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Contrataciones')
    .setDescription('API para el manejo de la informacion de cntrataciones')
    .addTag('aspirantes')
    .addTag('orden')
    .addTag('antecedentes')
    .addTag('diagnosticos')
    .addTag('HistoriaClinica')
    .addTag('tipo-documentos')
    .addTag('ciudad')
    .addTag('nivel-educativo')
    .addTag('Empresas')
    .addTag('Regimen')
    .addTag('actividades-economicas')
    .addTag('Elementos Proteccion Personal')
    .addTag('Factor Riesgo Biológico')
    .addTag('Factor Riesgo Químico')
    .addTag('Factor Riesgo Físico')
    .addTag('Factor Riesgo Psicosocial')
    .addTag('Factor Riesgo Ambiental')
    .addTag('Factor Riesgo Locativo')
    .addTag('Horario de Trabajo')
    .addTag('EPS')
    .addTag('ARL')
    .addTag('Fondo de Pensiones')
    .addTag('Estado Civil')
    .addTag('Grupo Sanguíneo')
    .addTag('certificados-medicos')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, documentFactory, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  app.enableCors(corsOptionsDelegate);
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${process.env.PORT} ${await app.getUrl()}`);
}
bootstrap();
