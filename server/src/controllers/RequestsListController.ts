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
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
      requestorName: req.query.requestorName
        ? (req.query.requestorName as string)
        : undefined,
      sapCode: req.query.country ? (req.query.country as string) : undefined,
      email: req.query.email ? (req.query.email as string) : undefined,
      page: req.query.page ? validateNumberParam(req.query.page) : 1,
      workflowType: req.query.workflowType
        ? validateNumberParam(req.query.workflowType)
        : undefined,
      requestOpenedStartDate: req.query.requestOpenedStartDate
        ? validateDateParam(req.query.requestOpenedStartDate)
        : undefined,
      requestOpenedEndDate: req.query.requestOpenedEndDate
        ? validateDateParam(req.query.requestOpenedEndDate)
        : undefined,
      requestClosedStartDate: req.query.requestClosedStartDate
        ? validateDateParam(req.query.requestClosedStartDate)
        : undefined,
      requestClosedEndDate: req.query.requestClosedEndDate
        ? validateDateParam(req.query.requestClosedEndDate)
        : undefined,
    };

    console.log(req.query);

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
