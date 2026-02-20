import { Router } from "express";
import { issuesRouter } from "./issues.routes";
import { usersRouter } from "./users.routes";
import { commentsRouter } from "./comments.route";
import { issueHistoryRouter } from "./statushistory.router";

const apiRouter = Router()

apiRouter.use("/v1/issues", issuesRouter)
apiRouter.use("/v1/users", usersRouter);
apiRouter.use("/v1/comments", commentsRouter);
apiRouter.use("/v1/status-history", issueHistoryRouter)

export {apiRouter}
