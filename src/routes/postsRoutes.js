import express from "express";
import { ListarPosts, buscarPostporID, idValid, queryDescricao } from "../controllers/postsController.js";

const routes = (app) => {
  // indica as middleware
  app.use(express.json());

  app.use('/posts/:id', idValid);

  app.get('posts/:id', buscarPostporID)

  app.get("/posts/", ListarPosts); 

  app.get("/posts/search", queryDescricao);

};

export default routes;