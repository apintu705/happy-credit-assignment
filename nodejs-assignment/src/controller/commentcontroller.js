import {Comment} from "../models/commentmodel.js"
import{ Post }from "../models/postmodel.js"

// create comment
export const createAComment=async(req, res, next) => {
    try{
        if(!req.body.postId){
            return res.status(400).json({message:"please enter the postId for which you are commenting"})
        }
        let post =await Post.findById(req.body.postId)
        if(!post){
            return res.status(400).json({message:"post doesn't exist for this postId please check"})
        }
        
        await Comment.create(req.body);
        
        const comment= await Comment.find()
        

            let comments=[]
            for(let j=0; j<comment.length; j++){
                if(String(post._id) === String(comment[j].postId)){
                    comments.push(comment[j])
                }
            }
            post={...post._doc,comments:comments}
        
        
        return res.status(200).json({message:"you have successfully commented",post})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}
