import { Router } from "express";
import { commentcontroller } from "../controllers/comments.controller";

const commentsRouter = Router();

commentsRouter.post("/",commentcontroller. create);
commentsRouter.get("/", commentcontroller.getAll);
commentsRouter.put("/:id", commentcontroller.update);
commentsRouter.delete("/:id", commentcontroller.delete);

export { commentsRouter };
