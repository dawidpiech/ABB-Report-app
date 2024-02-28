import { NextFunction, Request, Response } from "express";
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
import sql from "mssql";
import { fileDbConfig, requestsDbConfig } from "../config/configDatabase";

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

      const pool = await sql.connect(requestsDbConfig);

      const queryResult = await pool.query(requestDataQuery(params));
      const request = queryResult.recordset;

      const result = await convertToJSON(
        request[0].FormSpecification,
        request[0].FormData,
        request[0].InitialFormData
      );

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
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

      const pool = await sql.connect(requestsDbConfig);

      const queryResult = await pool.query(listOfStepsRequestQuery(params));
      const result = queryResult.recordset;

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
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

      const pool = await sql.connect(requestsDbConfig);

      const queryResult = await pool.query(requestDataOnStepsQuery(params));
      const request = queryResult.recordset;

      const result = await convertToJSON(
        request[0].FormSpecification,
        request[0].FormDataEnd,
        request[0].InitialFormData
      );

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
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

      const pool = await sql.connect(requestsDbConfig);

      const queryResult = await pool.query(requestListOfFilesQuery(params));
      const result = queryResult.recordset;

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
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

      const pool = await sql.connect(requestsDbConfig);

      const queryResult = await pool.query(requestListOfFilesQuery(params));
      const result = queryResult.recordset;

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
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

      const pool = await sql.connect(fileDbConfig);

      const queryResult = await pool.query(requestGetFileQuery(params));
      const result = queryResult.recordset;

      pool.close();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new RequestController();
