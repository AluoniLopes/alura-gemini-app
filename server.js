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
        descricao: "bom dia gato",
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

app.get("/posts/:id", (req, res)=>{
    const index = buscarPostporID(req.params.id)
    res.status(200).json(posts[index]);
});
