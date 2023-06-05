const express=require("express");
const {createComment, editComment, deleteComment}=require('../Controllers/commentController')
const commentRouter = express.Router();
const useAuth=require('../Middleware/tokenVerification')


// get commesnt for blog. No authentication 
commentRouter.use(useAuth)

// add, edit or delete commesnt for blog. Need authentication 
commentRouter.post('/:blog_id',createComment);
commentRouter.put('/update/:blog_id/:comment_id',editComment);
commentRouter.delete('/:blog_id/:comment_id',deleteComment);


module.exports=commentRouter