
const blogSchema=require('../Models/blogModel')
const {isEmpty}=require('../Heplers/hepler')
const commentSchema=require('../Models/commentModel')

const createBlog=async (req, res)=>{
    try {
    const {title, content}=req.body
    console.log(res.locals.author);
    const author=res.locals.author
    if(isEmpty(req.body)) return res.status(400).json({message: "The body should not be empty"})
    const newPost= new blogSchema({ title,content,author})
    const results =await newPost.save()
    return res.status(200).json(results)
    } catch (ex) {
        console.error(ex);
        return res.status(500).json({ error: ex.message });
    }
}
const getAlLBlog = async (req, res)=>{
   try {
    const results =await blogSchema.find({}).populate('author', 'email fullName')
    return res.status(200).json(results);
   } catch (ex) {
    return res.status(500).json({ error: ex.message });
   }
}
const editBlog = async (req, res)=>{
    try {
    const _id=req.params.blog_id
     const blog =await blogSchema.findOne({_id})
     if(!blog) return res.status(404).json({message: "Not found"})
     if(isEmpty(req.body)) return res.status(400).json({message: "The body should not be empty"})
     const response = await blogSchema.updateOne({_id}, {$set:{...req.body}})
     return res.status(200).json(response);
    } catch (ex) {
     return res.status(500).json({ error: ex.message });
    }
 }
 const deleteBlog = async (req, res)=>{
    try {
    const _id=req.params.blog_id
     const blog =await blogSchema.findOne({_id})
     if(!blog) return res.status(404).json({message: "Not found"})
     const response = await blogSchema.deleteOne({_id})
     await commentSchema.deleteMany({blog:_id})
     return res.status(200).json(response);
    } catch (ex) {
     return res.status(500).json({ error: ex.message });
    }
 }
 
const likeBlog= async (req, res)=>{
   try {
    const {blog_id}=req.params;
    const blog= await blogSchema.findOne({_id:blog_id});
    if(!blog) return res.status(404).json({message: "Not found"})
    const blogLikesById = blog?.likes?.map(json => json._id.toString())
    const author=res.locals.author

    if (!blogLikesById?.includes(author)){
        blog?.likes?.push(author)
        blog.likeCount = blog.likes?.length
        const results =await blog.save() ; 
        return res.status(200).json(results)    }
    else {
        const findIndex = blog.likes?.indexOf(author)
        blog.likes.splice(findIndex,1)
        blog.likeCount = blog.likes.length
        const results =await blog.save() ; 
        return res.status(200).json(results)
    }
   } catch (ex) {
    return res.status(500).json({ error: ex.message });
   }

}
module.exports={
    createBlog, getAlLBlog, editBlog, deleteBlog, likeBlog
}