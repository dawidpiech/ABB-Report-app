import express, { Application, Request, Response, NextFunction } from "express";
import listOfRequestsRoutes from "../routes/listOfRequestsRoutes";
import requestData from "../routes/requestDataRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import { NotFoundError } from "../erros/NotFoundError";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mainRoutes from "../routes/mainRoutes";
import { BearerStrategy } from "passport-azure-ad";
import passport from "passport";
import { config } from "../config/configAzureEntraID";
import { UnauthorizedUserError } from "../erros/UnuthorizedUserError";

dotenv.config();

const ExpressConfig = (): Application => {
  const app = express();

  let corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  passport.use(
    new BearerStrategy(
      {
        identityMetadata: config.identityMetadata,
        clientID: config.clientID,
        issuer: config.issuer,
        audience: config.clientID,
        validateIssuer: false,
        passReqToCallback: false,
        loggingLevel: "info",
        loggingNoPII: false,
        allowMultiAudiencesInToken: false,
      },
      (token, done) => {
        console.log(token);

        // Tutaj sprawdzamy token i rolę użytkownika
        // Jeżeli użytkownik ma odpowiednią rolę, wywołujemy done() z null jako błędem
        // W przeciwnym razie wywołujemy done() z błędem
      }
    )
  );

  app.use(passport.initialize());

  app.use((req, res, next) => {
    passport.authenticate(
      "oauth-bearer",
      { session: false },
      (err: Error, user: any, info: any) => {
        if (err) {
          next(new UnauthorizedUserError(`BŁĄD 1`));
        }
        if (!user) {
          next(new UnauthorizedUserError(`BŁĄD 2`));
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  });

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
