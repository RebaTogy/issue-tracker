import { Router } from "express";
import { issuesRouter } from "./issues.routes";

const apiRouter = Router()

apiRouter.use("/v1/issues", issuesRouter)

export {apiRouter}
