import { NextFunction, Request, Response } from "express";
import {
  requestsDatabasePool,
  fileDatabasePool,
} from "../config/configDatabase";
import {
  requestDataQuery,
  RequestDataParams,
  listOfStepsRequestQuery,
  ListOfStepsRequestParams,
  requestListOfFilesQuery,
  RequestListOfFilesParams,
  requestDataOnStepsQuery,
  RequestDataOnStepParams,
  RequestGetFileParams,
  requestGetFileQuery,
} from "../queries/requestDataQuery";
import dotenv from "dotenv";
import { validateNumberParam } from "../utils/validation";
import { BadRequestError } from "../erros/BadRequestError";
import { DatabaseError } from "../erros/DatabaseError";
import { convertToJSON } from "../utils/convertXMLtoJSON";

dotenv.config();

class RequestController {
  //Endpoint responsible for retrieving initiating request values
  public async getInitialRequestData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestDataParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
    };

    try {
      if (params.id === undefined || params.id === -1) {
        throw new BadRequestError(
          `The request must have a correct Request ID value`
        );
      }

      await requestsDatabasePool.connect();

      const queryResult = await requestsDatabasePool.query(
        requestDataQuery(params)
      );
      const request = queryResult.recordset;

      const result = await convertToJSON(
        request[0].FormSpecification,
        request[0].FormData,
        request[0].InitialFormData
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (requestsDatabasePool) {
        try {
          if (requestsDatabasePool.connected) {
            requestsDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }

  //Endpoint responsible for get the steps the request went through
  public async getListOfRequestSteps(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: ListOfStepsRequestParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
    };

    try {
      if (params.id === undefined || params.id === -1) {
        throw new BadRequestError(
          `The request must have a correct Request ID value`
        );
      }

      await requestsDatabasePool.connect();

      const queryResult = await requestsDatabasePool.query(
        listOfStepsRequestQuery(params)
      );
      const result = queryResult.recordset;

      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (requestsDatabasePool) {
        try {
          if (requestsDatabasePool.connected) {
            requestsDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }

  //Endpoint responsible for retrieving values at each step of the request
  public async getRequestDataOnStepQuery(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestDataOnStepParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
      stepID: req.query.stepID
        ? validateNumberParam(req.query.stepID)
        : undefined,
    };

    try {
      if (
        params.id === undefined ||
        params.id === -1 ||
        params.stepID === undefined ||
        params.stepID === -1
      ) {
        throw new BadRequestError(
          `The request must have a correct Request ID and Step ID value`
        );
      }

      await requestsDatabasePool.connect();

      const queryResult = await requestsDatabasePool.query(
        requestDataOnStepsQuery(params)
      );
      const request = queryResult.recordset;

      const result = await convertToJSON(
        request[0].FormSpecification,
        request[0].FormDataEnd,
        request[0].InitialFormData
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (requestsDatabasePool) {
        try {
          if (requestsDatabasePool.connected) {
            requestsDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }

  //Endpoint responsible for retrieving list of request files
  public async getFilesOfRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestListOfFilesParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
    };

    try {
      if (params.id === undefined) {
        throw new BadRequestError(`The request must have a Request ID value`);
      }

      await requestsDatabasePool.connect();

      const queryResult = await requestsDatabasePool.query(
        requestListOfFilesQuery(params)
      );
      const result = queryResult.recordset;

      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (requestsDatabasePool) {
        try {
          if (requestsDatabasePool.connected) {
            requestsDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }

  //Endpoint responsible for retrieving values at each step of the request
  public async getListOfFilesRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestListOfFilesParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
    };

    try {
      if (params.id === undefined || params.id === -1) {
        throw new BadRequestError(
          `The request must have a correct Request ID value`
        );
      }

      await requestsDatabasePool.connect();

      const queryResult = await requestsDatabasePool.query(
        requestListOfFilesQuery(params)
      );
      const result = queryResult.recordset;

      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (requestsDatabasePool) {
        try {
          if (requestsDatabasePool.connected) {
            requestsDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }

  public async getRequestFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestGetFileParams = {
      id: req.query.id ? (req.query.id as string) : undefined,
    };

    try {
      if (params.id === undefined) {
        throw new BadRequestError(
          `The request must have a correct File UUID value`
        );
      }

      await fileDatabasePool.connect();

      const queryResult = await fileDatabasePool.query(
        requestGetFileQuery(params)
      );
      const result = queryResult.recordset;

      res.status(200).json(result);
    } catch (error) {
      next(error);
    } finally {
      if (fileDatabasePool) {
        try {
          if (fileDatabasePool.connected) {
            fileDatabasePool.close();
          }
        } catch (error) {
          throw new DatabaseError(
            `An error occurred when closing the database connection.`
          );
        }
      }
    }
  }
}

export default new RequestController();
