import sql, { config } from "mssql";
import dotenv from "dotenv";
import { DatabaseError } from "../erros/DatabaseError";

dotenv.config();

const fileDbConfig: config = {
  server: process.env.DB_SERVER_LIVE ?? "",
  database: process.env.DB_REQUEST_DATA_DB_ADRESS_LIVE ?? "",
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER_NAME_LIVE ?? "",
      password: process.env.DB_PASSWORD_LIVE ?? "",
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const requestsDbConfig: config = {
  server: process.env.DB_SERVER_LIVE ?? "",
  database: process.env.DB_REQUEST_DATA_DB_ADRESS_LIVE ?? "",
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER_NAME_LIVE ?? "",
      password: process.env.DB_PASSWORD_LIVE ?? "",
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const dataPool = new sql.ConnectionPool(requestsDbConfig);
const filePool = new sql.ConnectionPool(fileDbConfig);

async function databaseConnect() {
  try {
    await dataPool.connect();
    await filePool.connect();
    console.log("Connected to both databases");
  } catch (err) {
    throw new DatabaseError(
      `There was a problem when trying to connect to the database.`
    );
  }
}

function databaseDisconnect() {
  try {
    dataPool.close();
    filePool.close();
    console.log("Disconected from both databases");
  } catch (err) {
    throw new DatabaseError(
      `There was a problem when trying to disconnect from the database.`
    );
  }
}

function queryRequestData(query: string) {
  return dataPool.request().query(query);
}

function queryFileData(query: any) {
  return filePool.request().query(query);
}

export { databaseConnect, databaseDisconnect, queryRequestData, queryFileData };
