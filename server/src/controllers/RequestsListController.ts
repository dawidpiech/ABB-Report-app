import { NextFunction, Request, Response } from "express";
import { requestsDatabasePool } from "../config/configDatabase";
import {
  countRequestsQuery,
  listOfRequestsQuery,
  listOfSapCodes,
  listOfWorkflows,
  RequestsListQueryParams,
} from "../queries/listOfRequestsQuery";
import dotenv from "dotenv";
import {
  validateNumberParam,
  validateDateParam,
  areRequestsParamsValid,
} from "../utils/validation";
import { BadRequestError } from "../erros/BadRequestError";
import { DatabaseError } from "../erros/DatabaseError";

dotenv.config();

class RequestsListController {
  public async getListOfRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestsListQueryParams = {
      id: req.body.id ? validateNumberParam(req.body.id) : undefined,
      requestorName: req.body.requestorName
        ? (req.body.requestorName as string)
        : undefined,
      sapCode: req.body.sapCode ? (req.body.sapCode as string) : undefined,
      email: req.body.email ? (req.body.email as string) : undefined,
      page: req.body.page ? validateNumberParam(req.body.page) : 1,
      workflowType: req.body.workflowType
        ? validateNumberParam(req.body.workflowType)
        : undefined,
      requestOpenedStartDate: req.body.requestOpenedStartDate
        ? validateDateParam(req.body.requestOpenedStartDate)
        : undefined,
      requestOpenedEndDate: req.body.requestOpenedEndDate
        ? validateDateParam(req.body.requestOpenedEndDate)
        : undefined,
      requestClosedStartDate: req.body.requestClosedStartDate
        ? validateDateParam(req.body.requestClosedStartDate)
        : undefined,
      requestClosedEndDate: req.body.requestClosedEndDate
        ? validateDateParam(req.body.requestClosedEndDate)
        : undefined,
    };

    const validParameterStatus = areRequestsParamsValid(params);

    try {
      if (!validParameterStatus.validationStatus) {
        throw new BadRequestError(
          `You have entered invalid values in the fields: ${validParameterStatus.wronglyValidatedFields.join(
            ", "
          )}`
        );
      }

      await requestsDatabasePool.connect();
      const queryResult = await requestsDatabasePool.query(
        listOfRequestsQuery(params)
      );
      const queryCount = await requestsDatabasePool.query(
        countRequestsQuery(params)
      );

      const requests = queryResult.recordset;
      const count = queryCount.recordset[0].COUNT;

      res.status(200).json({ count: count, requests: requests });
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

  public async getListOfSapCountry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await requestsDatabasePool.connect();
      const queryResult = await requestsDatabasePool.query(listOfSapCodes());
      const requests = queryResult.recordset;

      res.status(200).json(requests);
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

  public async getListOfWorkflowss(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await requestsDatabasePool.connect();
      const queryResult = await requestsDatabasePool.query(listOfWorkflows());
      const requests = queryResult.recordset;

      res.status(200).json(requests);
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
}

export default new RequestsListController();