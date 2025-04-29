import post from "../models/post.js";

export const createPost = async(req, res) => {

    try{
        const {imageUrl , description}  = req.body;
        if(!imageUrl || !description){
            return res.status(400).json({message: "Please fill all the fields"});
         }
         
         const newPost = await post.create({imageUrl, description});
         return res.status(201).json(newPost);
        } 
        catch(error){
            return res.status(500).json({message: error.message})
        }
};

export const getAllPosts = async(req,res) => {

    try{
        const posts = await post.findAll();
        res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};