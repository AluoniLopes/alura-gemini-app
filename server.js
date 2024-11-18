import express, { application } from "express";
// import dotenv from "dotenv";    
// dotenv.config();

const port = process.env.PORT || 3000;
const api_gemini = process.env.GEMINI_APP;
const app = express();

app.listen(port, ()=>{
    console.log(`ouvindo em ${port}`);
});

app.get("/api", (req, res)=>{
    res.status(200).send('rota rastreada com sucesso!')
});