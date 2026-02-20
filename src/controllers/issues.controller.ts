import { RequestHandler } from "express";
import { ICreateIssue, issueService, IUpdateIssue } from "../services/issues.service";
import { StatusHistory } from "../models/statusHistory.model";
import { Issue } from "../models/issue.models";

class IssuesController {

  create: RequestHandler = async (req, res) => {
    const { title, description, user_id } = req.body as ICreateIssue;

    if (!title || !description || !user_id || !title.trim() || !description.trim()) {
      return res.status(400).json({
        error: "Title, description and user_id are required",
      });
    }

    const issue = await issueService.create({ title, description, user_id });
    return res.status(201).json(issue);
  };

  getAll: RequestHandler = async (_req, res) => {
    const issues = await issueService.getAll();
    return res.json(issues);
  };

  getById: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const issue = await issueService.getById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.json(issue);
  };

  update: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const { title, description, status } = req.body;

    const issue = await Issue.findByPk(id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const old_status = issue.status;
    const newData: IUpdateIssue = {}

    console.log({ title, status, description })
    if (title !== undefined) newData.title = title;
    if (description !== undefined) newData.description = description;
    if (status !== undefined) newData.status = status;
    const issueData = issue.toJSON();
    await Issue.update(newData, { where: { id: id } });

    if (status !== undefined && old_status !== status) {

      await StatusHistory.create({
        issue_id: id,
        user_id: issueData.user_id,
        old_status,
        new_status: status,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: issue,
    });

  };

  delete: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid issue id" });
    }

    const deleted = await issueService.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Issue not found" });
    }

    return res.status(200).json({
      message: "Issue deleted successfully",
      issue: deleted,
    });
  };
}

export const issuesController = new IssuesController();
