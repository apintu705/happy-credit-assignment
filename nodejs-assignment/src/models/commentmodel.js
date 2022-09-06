import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId, ref:"post"}, 
    name:{type:String,required:true},
    email:{type:String,required:true},
    body:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true,
})


export const Comment=mongoose.model("comment",commentSchema)