import { Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";

class Users {

  getAll: RequestHandler = async (_req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  }

  getById: RequestHandler = async (req, res) => {
    const id = req.params.id as string;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  }

  create: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  }

  update: RequestHandler = async (req, res) => {
    const id = req.params.id as string;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.update(req.body);
    res.status(200).json(user);
  }

  delete: RequestHandler = async (req, res) => {
    const id = req.params.id as string;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  }
}

export const usersController = new Users();