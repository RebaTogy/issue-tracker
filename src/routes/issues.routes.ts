import { Router } from "express";
import {issuesController } from "../controllers/issues.controller";

const issuesRouter = Router()

issuesRouter.get("/", issuesController.getAll);
issuesRouter.post("/", issuesController.create);
issuesRouter.get("/:id", issuesController.getById);
issuesRouter.put("/:id", issuesController.update);
issuesRouter.delete("/:id", issuesController.delete);

export { issuesRouter }