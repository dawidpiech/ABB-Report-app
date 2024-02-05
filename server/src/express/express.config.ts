import express, { Application } from "express";
import requestsRoutes from "../routes/RequestsRoute";

const ExpressConfig = (): Application => {
  const app = express();

  //routes
  app.use("/api", requestsRoutes);

  return app;
};

export default ExpressConfig;
