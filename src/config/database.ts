import * as sql from 'mssql'; // Importación correcta
import { config } from 'dotenv';

config(); // Cargar las variables de entorno

const getConnection = async (coon?: string) => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    requestTimeout: 300000,
    options: {
      encrypt: parseInt(process.env.DB_ENCRYPT) === 1 ? true : false, // for azure
      trustServerCertificate:
        parseInt(process.env.DB_TRUST_CERTIFICATE) === 1 ? true : false, // change to true for local dev / self-signed certs
    },
    pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 300000,
    },
  };

  try {
    const pool = await sql.connect(config); // Realizamos la conexión
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export default { getConnection };
