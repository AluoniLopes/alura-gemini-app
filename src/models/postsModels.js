import conectarAoBanco from "../dbConfig.js";

const conexao = await conectarAoBanco(process.env.MONGODB_STR);

export async function getTodosPosts() {
  const db = conexao.db("alura-gemini");
  const colecao = db.collection("posts"); //console.log(colecao)
  return colecao.find().toArray()
};