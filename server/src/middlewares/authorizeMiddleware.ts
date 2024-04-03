import passport from "passport";
import { BearerStrategy } from "passport-azure-ad";
import { config } from "../config/configAzureEntraID";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedUserError } from "../erros/UnuthorizedUserError";

passport.initialize();

passport.use(
  new BearerStrategy(
    {
      identityMetadata: config.identityMetadata,
      clientID: config.clientID,
      validateIssuer: config.validateIssuer,
      passReqToCallback: config.passReqToCallback,
      issuer: config.issuer,
      audience: config.clientID,
      loggingLevel: config.loggingLevel,
      loggingNoPII: config.loggingNoPII,
      allowMultiAudiencesInToken: config.allowMultiAudiencesInToken,
    },
    (req, token, done) => {
      if (token.roles && token.roles.includes("Reader")) {
        return done(null, token);
      } else {
        return done(
          new UnauthorizedUserError(
            "You don't have permissions to this resource."
          ),
          null
        );
      }
    }
  )
);

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "oauth-bearer",
    { session: false },
    (err: Error, user: any, info: any) => {
      if (err) {
        next(
          new UnauthorizedUserError(`Somethig went wrong during authorization.`)
        );
      }
      if (!user) {
        next(new UnauthorizedUserError(`The user was not recognized.`));
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export { authMiddleware };
