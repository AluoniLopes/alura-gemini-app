// import "dotenv/config";
import express from "express";
import routes from "./src/routes/postsRoutes.js";

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

app.listen(PORT, ()=>{
    console.log(`ouvindo em ${PORT}`);
});

routes(app)

// Rotas

// app.get("/posts/:id", (req, res)=>{
//     res.status(200).json(req.post)
// });

// app.get("/posts/:id/image", (req, res)=>{
//     res.status(200).send(`
//         <figure>
//           <img src="${req.post.imagem}" alt="Minha Figura">
//           <figcaption>${req.post.descricao}</figcaption>
//         </figure>
//       `)
// });

