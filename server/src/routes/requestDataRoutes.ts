import { Router } from "express";
import RequestController from "../controllers/RequestController";

const requestData = Router();

requestData.get("/getRequestData", (req, res, next) => {
  RequestController.getInitialRequestData(req, res, next);
});

requestData.get("/getListOfRequestSteps", (req, res, next) => {
  RequestController.getListOfRequestSteps(req, res, next);
});

requestData.get("/getRequestDataOnStep", (req, res, next) => {
  RequestController.getRequestDataOnStepQuery(req, res, next);
});

requestData.get("/getRequestListOfFiles", (req, res, next) => {
  RequestController.getListOfFilesRequest(req, res, next);
});

requestData.get("/getRequestFile", (req, res, next) => {
  RequestController.getRequestFile(req, res, next);
});

export default requestData;
