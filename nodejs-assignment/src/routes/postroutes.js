import express from 'express';
import { createAPost, getAllPosts } from '../controller/postcontroller.js';

const postrouter=express.Router();

// create post
postrouter.post("/createpost",createAPost)
// get all post as per question
postrouter.get("/",getAllPosts)

export default postrouter;