 

import comment from '../models/comment.js';

export const createcomment = async (req, res) => {
    try {
        const { postId, commentText } = req.body;
        if (!postId || !commentText) {
            return res.status(400).json({ message: "Please provide postId and commentText" });
        }

        const newcomment = await comment.create({ postId, commentText });
        res.status(201).json(newcomment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) {
            return res.status(400).json({ message: "postId not found" });
        }

        const comments = await comment.findAll({ where: { postId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
