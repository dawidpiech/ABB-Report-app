import { Request, Response } from "express";
import {
  fileDatabasePool,
  requestsDatabasePool,
} from "../config/configDatabase";
import {
  ListOfRequestsQuery,
  RquestsListQueryParams,
} from "../queries/requestsListQueries";

import dotenv from "dotenv";

dotenv.config();

class RequestsController {
  public async getListOfRequests(req: Request, res: Response): Promise<void> {
    const params: RquestsListQueryParams = {
      id: req.query.id ? parseInt(req.query.id as string, 10) : undefined,
      requestorName: req.query.requestorName as string | undefined,
      email: req.query.email as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      requestOpenedStartDate: req.query.requestOpenedStartDate as
        | Date
        | undefined,
      requestOpenedEndDate: req.query.requestOpenedEndDate as Date | undefined,
      requestClosedStartDate: req.query.requestClosedStartDate as
        | Date
        | undefined,
      requestClosedEndDate: req.query.requestClosedEndDate as Date | undefined,
    };

    console.log(params);

    try {
      await requestsDatabasePool.connect();
      const queryResult = await requestsDatabasePool.query(
        ListOfRequestsQuery(params)
      );
      const requests = queryResult.recordset;

      if (!requests) {
        res
          .status(404)
          .json({ error: "No records were found that meet the criteria." });
        return;
      }

      res.status(200).json(requests);
    } catch (error) {
      console.error("Error connecting to the database:", error);
    } finally {
      requestsDatabasePool.close();
    }
  }
}

export default new RequestsController();
