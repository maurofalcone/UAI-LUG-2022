import { Request, Response } from "express";
import UserModel from "../models/users";

export const userController = {
  post: async (req: Request, res: Response) => {
    try {
      const newBlog = new UserModel({ ...req.body });
      await newBlog.save();
      res.status(200).send(newBlog);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const blogList = await UserModel.find({ _id: req.params.id });
      res.status(200).send(blogList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const blogList = await UserModel.find();
      res.status(200).send(blogList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
