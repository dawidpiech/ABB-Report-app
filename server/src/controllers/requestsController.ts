import { NextFunction, Request, Response } from "express";
import { requestsDatabasePool } from "../config/configDatabase";
import {
  ListOfRequestsQuery,
  RequestsListQueryParams,
} from "../queries/listOfRequestsQuery";
import dotenv from "dotenv";
import {
  validateNumberParam,
  validateDateParam,
  areRequestsParamsValid,
} from "../utils/validation";
import { BadRequestError } from "../erros/BadRequestError";
import { DatabaseError } from "erros/DatabaseError";

dotenv.config();

class RequestsController {
  public async getListOfRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const params: RequestsListQueryParams = {
      id: req.query.id ? validateNumberParam(req.query.id) : undefined,
      requestorName: req.query.requestorName as string | undefined,
      companyName: req.query.companyName as string | undefined,
      requestTitle: req.query.requestTitle as string | undefined,
      email: req.query.email as string | undefined,
      page: req.query.page ? validateNumberParam(req.query.page) : 1,
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
        ListOfRequestsQuery(params)
      );
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

export default new RequestsController();
