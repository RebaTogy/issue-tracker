import { Request, RequestHandler, Response } from "express";
import { Comment } from "../models/comment.model";

class CommentController {

  create: RequestHandler = async (req, res) => {
    const { content, issue_id, user_id } = req.body;
    if (!content || !issue_id || !user_id) {
      return res.status(400).json({
        message: "content, issue_id and user_id are required",
      });
    }

    if (isNaN(Number(issue_id))) {
      return res.status(400).json({
        message: "issue_id must be a number",
      });
    }

    const comment = await Comment.create({
      content,
      issue_id: Number(issue_id),
      user_id,
    });

    return res.status(201).json(comment);

  }

  getAll: RequestHandler = async (req, res) => {
    const comments = await Comment.findAll();
    return res.status(200).json(comments);
  }

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "Comment id must be a number",
      });
    }
    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }
    const comment = await Comment.findByPk(Number(id));

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    await comment.update({ content });
    return res.status(200).json(comment);
  }

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const deleted = await Comment.destroy({
      where: { id: Number(id) }
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    return res.status(200).json({
      message: "Comment deleted successfully"
    });

  }
};

export const commentcontroller = new CommentController();

