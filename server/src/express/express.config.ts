import express, { Application, Request, Response, NextFunction } from "express";
import listOfRequestsRoutes from "../routes/listOfRequestsRoutes";
import requestData from "../routes/requestDataRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import { NotFoundError } from "../erros/NotFoundError";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mainRoutes from "../routes/mainRoutes";

dotenv.config();

const ExpressConfig = (): Application => {
  const app = express();

  var corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.json());

  //routes
  app.use("/api", mainRoutes);
  app.use("/api/list", listOfRequestsRoutes);
  app.use("/api/request", requestData);

  //catch all routes which have not been serviced
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError(`Endpoint "${req.originalUrl}" not found`);
    next(error);
  });

  //error middleware
  app.use(errorHandler);

  return app;
};

export default ExpressConfig;
