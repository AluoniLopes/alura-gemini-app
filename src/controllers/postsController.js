import { getTodosPosts } from "../models/postsModels.js";

export async function ListarPosts(req, res) {
  const postdb = await getTodosPosts();
  res.status(200).json(postdb);
}