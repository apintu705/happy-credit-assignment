import{ Post }from "../models/postmodel.js"
import { Comment } from "../models/commentmodel.js";

// create a post

export const createAPost=async(req, res, next) => {
    try{
        const post = await Post.create(req.body);
        return res.status(200).json({message:"post created successfully",post})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}


// get all posts

export const getAllPosts = async(req, res, next) => {
    try{
        const post = await Post.find();
        const comment= await Comment.find()
        for(let i=0; i<post.length; i++){
            let comments=[]
            for(let j=0; j<comment.length; j++){
                if(String(post[i]._id) === String(comment[j].postId)){
                    comments.push(comment[j])
                }
            }
            post[i]={...post[i]._doc,comments:comments}
        }

        return res.status(200).json({post})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}