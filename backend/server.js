// import "dotenv/config";
import express from "express";
import routes from "./src/routes/postsRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, ()=>{
    console.log(`ouvindo em ${PORT}`);
});
app.use(express.static("uploads"))
routes(app)
