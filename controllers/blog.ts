import { Request, Response } from "express";
import BlogModel from "../models/blogs";
import CommentModel, { IComment } from "../models/comments";

export const blogController = {
  post: async (req: Request, res: Response) => {
    try {
      const newBlog = new BlogModel({ ...req.body });
      await newBlog.save();
      res.status(200).send(newBlog);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  postComment: async (req: Request, res: Response) => {
    try {
      const blogs = await BlogModel.find({ _id: req.params.id });
      if (blogs.length) {
        const comment = await new CommentModel<IComment>({ ...req.body });
        await comment.save();
        blogs[0].comments.push(comment._id);
        await blogs[0].save();
        res.status(200).send(blogs[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  removeComment: async (req: Request, res: Response) => {
    try {
      const { id, commentId } = req.params;
      // encontrar el blog con el comentario que quiero eliminar basado en un id del blog.
      const blog = await BlogModel.findOne({ _id: id }).populate<{
        comments: IComment[];
      }>("comments");
      if (blog) {
        const idx = blog.comments.findIndex((comment) => {
          return commentId === comment._id.toString();
        });
        if (idx !== -1) {
          // eliminar el comentario de la tabla comentarios
          await CommentModel.findOneAndRemove({
            _id: commentId,
          });
          // eliminar el comentario del blog
          blog.comments.splice(idx, 1);
          // guardar el comentario
          await blog.save();
          res.status(200).send(blog);
        } else {
          res.status(404).send({ error: "Comment not found" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  get: async (_req: Request, res: Response) => {
    try {
      const blogList = await BlogModel.find();
      res.status(200).send(blogList);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
