import passport from "passport";
import { BearerStrategy } from "passport-azure-ad";
import { config } from "../config/configAzureEntraID";
import { Request, Response, NextFunction } from "express";

passport.use(
  new BearerStrategy(
    {
      identityMetadata: config.identityMetadata,
      clientID: config.clientID,
      validateIssuer: false,
      passReqToCallback: false,
    },
    (token, done) => {
      // Tutaj sprawdzamy token i rolę użytkownika
      // Jeżeli użytkownik ma odpowiednią rolę, wywołujemy done() z null jako błędem
      // W przeciwnym razie wywołujemy done() z błędem
    }
  )
);

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   // passport.authenticate(
//   //   "oauth-bearer",
//   //   { session: false },
//   //   (err: Error, user: any) => {
//   //     if (err) {
//   //       return res.status(500).json({ error: "Internal Server Error" });
//   //     }
//   //     if (!user) {
//   //       return res.status(401).json({ error: "Unauthorized" });
//   //     }
//   //     // Jeśli użytkownik jest uwierzytelniony, dodaj token do obiektu żądania
//   //     (req as any).token = user;
//   //     next();
//   //   }
//   // )(req, res, next);
//   next();
// };

// export { authMiddleware };
