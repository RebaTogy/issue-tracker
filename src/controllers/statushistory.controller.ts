import { Request, RequestHandler, Response } from "express";
import { StatusHistory } from "../models/statusHistory.model";

class StatusHistoryController {

  getAll: RequestHandler = async (req: Request, res: Response) => {
      const issueId = Number(req.params.issueId);
      const history = await StatusHistory.findAll({
        where: { issue_id: issueId },
        order: [["changed_at", "ASC"]],
      });

      if (isNaN(issueId)) {
        res.status(400).json({ message: "Invalid issue id" });
        return;
      }
      res.status(200).json({
        success: true,
        data: history,
      });
      res.status(500).json({ message: "Failed to fetch issue" });
    }
  }
export const statusHistoryController = new StatusHistoryController();
