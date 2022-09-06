import express from 'express';
import { createAComment } from '../controller/commentcontroller.js';

const commentrouter=express.Router();

// create comment as per question
commentrouter.post("/",createAComment)


export default commentrouter