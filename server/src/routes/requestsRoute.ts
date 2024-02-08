import { Router } from "express";
import RequestsController from "../controllers/RequestsController";

const requestsRoutes = Router();

requestsRoutes.get("/requests", (req, res, next) => {
  RequestsController.getListOfRequests(req, res, next);
});

requestsRoutes.get("/", (req, res) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

export default requestsRoutes;
