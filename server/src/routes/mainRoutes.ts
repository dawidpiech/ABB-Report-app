import { Router } from "express";
import RequestsListController from "../controllers/RequestsListController";

const mainRoutes = Router();

mainRoutes.get("/", (req, res) => {
  return res.status(200).send({
    message: `Server works on port ${process.env.PORT_LIVE}`,
  });
});

export default mainRoutes;
