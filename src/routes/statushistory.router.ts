import { Router } from "express";
import { statusHistoryController } from "../controllers/statushistory.controller";

const issueHistoryRouter = Router();

issueHistoryRouter.get("/:issueId", statusHistoryController.getAll);

export { issueHistoryRouter};
