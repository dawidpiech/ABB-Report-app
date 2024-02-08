import express, { Application, Request, Response, NextFunction } from "express";
import requestsRoutes from "../routes/requestsRoute";
import { errorHandler } from "../middlewares/errorHandler";
import { NotFoundError } from "../erros/NotFoundError";

const ExpressConfig = (): Application => {
  const app = express();

  //routes
  app.use("/api", requestsRoutes);

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
