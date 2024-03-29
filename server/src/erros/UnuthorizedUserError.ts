import { CustomError } from "../utils/CustomError";

class UnauthorizedUserError extends CustomError {
  statusCode = 401;

  constructor(message: string) {
    super(`${message}`);
  }
}

export { UnauthorizedUserError };
