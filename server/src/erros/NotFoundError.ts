import { CustomError } from "../utils/CustomError";

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string) {
    super(`${message}`);
  }
}

export { NotFoundError };
