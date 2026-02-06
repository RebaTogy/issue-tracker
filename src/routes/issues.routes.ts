import {issuesController } from "../controllers/issues.controller";
import { Router } from "express";

const issuesRouter = Router()

issuesRouter.get("/", issuesController.getAll);
issuesRouter.get("/:id", issuesController.getById);
issuesRouter.post("/", issuesController.create);
issuesRouter.put("/:id", issuesController.update);
issuesRouter.delete("/:id", issuesController.delete);

export {issuesRouter}