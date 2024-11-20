import { getTodosPosts } from "../models/postsModels.js";

export function idValid(req, res, next){
  const index = buscarPostporID(req.params.id);
  if (index >= 0) {
    req.post = posts[index]; // Adicione o post encontrado na requisição
    next(); // Permita a requisição continuar
  } else {
    res.status(404).json('404: id not found');
}}

export async function ListarPosts(req, res) {
  const postdb = await getTodosPosts();
  res.status(200).json(postdb);
}

export function buscarPostporID(id) {
  return posts.findIndex((post) => {
      return post.id === Number(id)
  })
};

export function queryDescricao(req, res){    
  const searchTerm = req.query.descricao;
  if(searchTerm === undefined){
    res.status(400).send('"descricao" nao especificado')
  }else{
  // Filtrando os posts que contêm o termo de busca na descrição
  const filteredPosts = posts.filter(post =>
    post.descricao.toLowerCase().includes(searchTerm.toLowerCase()));
  if(filteredPosts.length > 0){
    res.json(filteredPosts)
  }else{
    res.status(404).send(`404: not found`)}
}}