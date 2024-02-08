import { CustomError } from "../utils/CustomError";

class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(message: string) {
    super(`Database error: ${message}`);
  }
}

export { DatabaseError };
