import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userId:{type:Number,default:1}, 
    title:{type:String,required:true},
    body:{type:String,required:true},
    // comments:[{type:mongoose.Schema.Types.ObjectId, ref:"comment"}]
},{
    versionKey:false,
    timestamps:true,
})


export const Post=mongoose.model("post",postSchema)