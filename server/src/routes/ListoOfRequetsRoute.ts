import { Router } from 'express';
import RequestListController from '../controllers/RequestsListController';

const router = Router();

router.get('/requests', (req, res) => {
    RequestListController.getListOfRequests(req, res);
  });

export default router;