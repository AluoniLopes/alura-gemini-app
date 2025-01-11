import fs from "fs";
import { atualizarPost, criarPost, getTodosPosts } from "../models/postsModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

// export function ValidarID(req, res, next){
//   const index = buscarPostporID(req.params.id);
//   if (index >= 0) {
//     req.post = posts[index]; // Adicione o post encontrado na requisição
//     next(); // Permita a requisição continuar
//   } else {
//     res.status(404).json({erro: 'ID não encontrado'});
// }}

// export function queryDescricao(req, res){
//   const searchTerm = req.query.descricao;
//   if(searchTerm === undefined){
//     res.status(400).send('"descricao" nao especificado')
//   }else{
//   // Filtrando os posts que contêm o termo de busca na descrição
//   const filteredPosts = posts.filter(post =>
//     post.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
//   if(filteredPosts.length > 0){
//     res.json(filteredPosts)
//   }else{
//     res.status(404).send(`404: not found`)}
// }}

export async function ListarPosts(req, res) {
  const postdb = await getTodosPosts();
  res.status(200).json(postdb);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro": "falha na requisição"})
  }  
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    const postCriado = await criarPost(novoPost);
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
    fs.renameSync(req.file.path, imagemAtualizada)
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro": "falha na requisição"})
  }  
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem =`http://localhost:3000/${id}.png`;
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro": "falha na requisição"})
  }  
}