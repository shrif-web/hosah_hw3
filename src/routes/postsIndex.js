import { Router } from 'express';

import Post from '../models/post'

const router = Router();

router.get('', async(req, res) => {
    const posts = await Post.find({ }, { _id: false, __v: false })
    posts.forEach((post) => {
        post.created_at = `${post.created_at.getFullYear()}/${post.created_at.getMonth() + 1}/${post.created_at.getDate()}`
    })
    return res.status(200).send(posts)
})

export default router;