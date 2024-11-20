import express from "express";
import { ListarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  // indica as middleware
  app.use(express.json());

  app.use('/posts/:id', (req, res, next) => {
  const index = buscarPostporID(req.params.id);
  if (index >= 0) {
    req.post = posts[index]; // Adicione o post encontrado na requisição
    next(); // Permita a requisição continuar
  } else {
    res.status(404).json('404: id not found');
}});

  app.get("/posts/", ListarPosts); 
};

export default routes;