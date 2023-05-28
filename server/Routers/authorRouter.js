const express=require("express");
const {registerAuthor, loginAuthor}=require("../Controllers/authorController");

const authorRouter = express.Router();

authorRouter.post("/register",registerAuthor);

authorRouter.post("/login",loginAuthor);



module.exports=authorRouter