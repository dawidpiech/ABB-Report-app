import { ConnectionPool, config } from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: config = {
    server: process.env.DB_SERVER ?? '',
    database: process.env.DB_FILE_DB_ADRESS ?? '',
    authentication: {
      type: "ntlm",
      options: {
        userName: process.env.DB_USER_NAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
        domain: process.env.DB_USER_DOMAIN ?? '',
      },
    },
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
};

const pool = new ConnectionPool(dbConfig);

export default pool;