import { CustomError } from "../utils/CustomError";

class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string) {
    super(`Bad request error: ${message}`);
  }
}

export { BadRequestError };
