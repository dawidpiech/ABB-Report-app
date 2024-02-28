import ExpressConfig from "./express/express.config";
import dotenv from "dotenv";
import { databaseConnect } from "../src/config/configDatabase";

const app = ExpressConfig();

dotenv.config();

try {
  databaseConnect().then(() => {
    app.listen(process.env.PORT, (): void => {
      console.log(
        `Connected successfully! Server working on port ${process.env.PORT}`
      );
    });
  });
} catch (error: any) {
  console.error(`Error occurred during server startup: ${error.message}`);
}
