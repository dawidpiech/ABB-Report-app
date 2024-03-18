import { Router } from "express";
import RequestsListController from "../controllers/RequestsListController";

const listOfRequestsRoutes = Router();

listOfRequestsRoutes.get("/getListOfRequests", (req, res, next) => {
  RequestsListController.getListOfRequests(req, res, next);
});

listOfRequestsRoutes.get("/getListOfSapCountry", (req, res, next) => {
  RequestsListController.getListOfSapCountry(req, res, next);
});

listOfRequestsRoutes.get("/getListOfWorkflows", (req, res, next) => {
  RequestsListController.getListOfWorkflowss(req, res, next);
});

export default listOfRequestsRoutes;
