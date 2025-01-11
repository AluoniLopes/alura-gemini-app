import { ObjectId } from "mongodb";
import conectarAoBanco from "../dbConfig.js";

const conexao = await conectarAoBanco(process.env.MONGODB_STR);

export async function getTodosPosts() {
  const db = conexao.db("alura-gemini");
  const colecao = db.collection("posts");
  return colecao.find().toArray()
};

export async function criarPost(novoPost) {
  const db = conexao.db("alura-gemini");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost)  
};

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("alura-gemini");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})  
};  