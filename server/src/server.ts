import ExpressConfig from "./express/express.config";
import dotenv from "dotenv";

const app = ExpressConfig();

dotenv.config();

try {
  app.listen(process.env.PORT, (): void => {
    console.log(
      `Connected successfully! Server working on port ${process.env.PORT}`
    );
  });
} catch (error: any) {
  console.error(`Error occurred during server startup: ${error.message}`);
}
