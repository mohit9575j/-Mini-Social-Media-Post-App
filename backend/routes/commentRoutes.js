
import express from 'express';
import { createcomment, getCommentByPost } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createcomment);   
router.get('/:postId', getCommentByPost);   

export default router;
