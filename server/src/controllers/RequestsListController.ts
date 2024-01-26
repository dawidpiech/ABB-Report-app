import { Request, Response } from 'express';
import pool from '../config/configRequestDataDatabase';
import { ListOfRequestsQuery, RquestsListQueryParams } from '../queries/requestsListQueries';

class RequestListController {
  public async getListOfRequests(req: Request, res: Response): Promise<void> {
    try {
      const params: RquestsListQueryParams = {
        id: req.params.id ? parseInt(req.params.id, 10) : undefined,
        name: req.query.name as string | undefined,
        email: req.query.email as string | undefined,
        page: req.query.page ? parseInt(req.params.page, 10) : 0,
      };

      const queryResult = await pool.query(ListOfRequestsQuery(params));
      const requests = queryResult.recordset;

      if (!requests) {
        res.status(404).json({ error: 'No records were found that meet the criteria.' });
        return;
      }

      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new RequestListController();