import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3000;
const api_gemini = process.env.GEMINI_APP;
const app = express();

const posts = [
    {
        id: 0,
        descricao: "uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 1,
        descricao: "outra imagem teste",
        imagem: "https://placecats.com/neo/300/150"
    },
    {
        id: 2,
        descricao: "um gato na cozinha",
        imagem: "https://placecats.com/neo_banana/300/150"
    },
    {
        id:3,
        descricao: "um gato brilhante",
        imagem: "https://placecats.com/neo_2/300/150"
    },
    {  
        id:4,
        descricao: "bom dia gato",
        imagem: "https://placecats.com/bella/300/150"
    },
    {
        id: 5,
        descricao: "bom dia gatonaldo",
        imagem: "https://placecats.com/g/300/150"
    },
];

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`ouvindo em ${PORT}`);
});

app.get("/posts/", (req, res)=>{
    res.status(200).json(posts);
});

function buscarPostporID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

// Aplicando o middleware a todas as rotas com /posts/:id
app.use('/posts/:id', (req, res, next) => {
  const index = buscarPostporID(req.params.id);
  if (index >= 0) {
    req.post = posts[index]; // Adicione o post encontrado na requisição
    next(); // Permita a requisição continuar
  } else {
    res.status(404).json('404: id not found');
  }
});

// Rotas
app.get("/posts/search", (req, res) => {    
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
        res.status(404).send(`404: not found`)
    }
}
});

app.get("/posts/:id", (req, res)=>{
    res.status(200).json(req.post)
});

app.get("/posts/:id/image", (req, res)=>{
    res.status(200).send(`
        <figure>
          <img src="${req.post.imagem}" alt="Minha Figura">
          <figcaption>${req.post.descricao}</figcaption>
        </figure>
      `)
});

