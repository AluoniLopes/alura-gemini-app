import express from "express";
import multer from "multer";
import cors from "cors"
import { atualizarNovoPost, ListarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const corsOption = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
  // Middlewares
  app.use(express.json());
  app.use(cors(corsOption))

  app.get("/posts/", ListarPosts); 
  app.post("/posts/", postarNovoPost);
  app.post("/upload", upload.single('imagem'), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost)

};

export default routes;