import express from 'express';
import { createUser, login } from '../controllers/userController.js';
import { createBlog, deleteBlog, filteredByAuthor, filteredByKeyword, getAllBlog, getBlog, updateBlog, uploadImage } from '../controllers/blogController.js';
import { authorization, authrentication } from '../middlewares/auth.js';

const router=express.Router();

//Register User
router.post("/register",createUser)

//Login User
router.post("/login",login);


//Create Blog
router.post("/blog",createBlog);

//Get single Blog
router.get("/blog/:bId",authrentication,authorization,getBlog);

//Update blog
router.put("/blog/:bId",authrentication,authorization,updateBlog);

//Delete Blog
router.delete("/blog/:bId",authrentication,authorization,deleteBlog);

//Get All Blog
router.get("/blog/create",getAllBlog);

//filtered methods api's
router.get("/blog/filtered/keyword",filteredByKeyword);
router.get("/blog/filtered/author",filteredByAuthor);


//upload photo
router.post("/photo-upload",authrentication,authorization,uploadImage)

export default router;