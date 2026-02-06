import { RequestHandler } from "express";
import { ICreateIssue, issueService, IUpdateIssue } from "../services/issues.service";
import { IssueStatusEnum } from "../models/issues.models";
class IssuesController {
  create: RequestHandler = (req, res) => {
    const { title, description } = req.body as Partial<ICreateIssue>;
    if (!title || !description || !title.trim() || !description.trim()) {
      return res.status(400).json({
        error: "Title and description are required",
      });
    }

    const issue = issueService.create({ title, description });
    return res.status(201).json(issue);
  };

  getAll: RequestHandler = (_req, res) => {
    res.json(issueService.getAll());
  };

  getById: RequestHandler = (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const issue = issueService.getById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.json(issue);
  };


  update: RequestHandler = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const data = req.body as IUpdateIssue;

    if (!data.title && !data.description && !data.status) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const allowedStatus = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

    if (data.status && !allowedStatus.includes(data.status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const issue = issueService.update(id, data);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.status(200).json(issue);
  };

  delete: RequestHandler = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const deleted = issueService.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Issue not found" });
    }
    return res.status(200).json({
      message: "Issue deleted successfully",
      issue: deleted
    });
  };
}

export const issuesController = new IssuesController();