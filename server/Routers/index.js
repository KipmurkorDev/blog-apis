const authorRouter=require("./authorRouter")
const blogRouter=require('./blogRouter')
const commentRouter=require('./commentRouter')

const express =require('express')
const router =express.Router()

router.use('/author',authorRouter);
router.use('/blog', blogRouter);
router.use('/comment',commentRouter);






module.exports=router