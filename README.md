blogging-appilcation
This is a simple API for a blog. It includes authentication so that only the owner of the blog can create, edit, and delete blog. It uses Nodejs, Express, and MongoDB.

The blog has the following endpoints:

-POST /blog/article Creates a new blog. Requires authentication.

-GET /blog/ Gets all blogs.

PUT /blog/article/update/:blog_id Updates a blog. Requires authentication.

DELETE /blog/article/:blog_id Deletes a blog. Requires authentication.

POST /blog/article/like/:blog_id Updates like and dislikes. Requires authentication.

POST /comment/:blog_id Add comment a to blog. Requires authentication.

GET /comment/:blog_id Gets all comments for a blog.

PUT /comment/update/:blog_id/:comment_id Updates a comment for a blog. Requires authentication.

DELETE /comment/blog_id/:comment_id Deletes a comment for a blog. Requires authentication.

POST /author/register Registers a new author

POST /author/login Logs in a author.It generate token using jwt.