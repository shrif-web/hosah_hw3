import { Router } from 'express'

import Post from '../models/post'
import authenticateMiddleware from '../middleware/jwt_authenticate'

const router = Router()

router.use(authenticateMiddleware)

router.post('', async(req, res) => {
    const body = req.body
    const title = body.title
    const content = body.content
    if (title === '') {
        return res.status(400).send({
            message: 'field `title` is not valid'
        })
    }
    if (!title || !content) {
        return res.status(400).send({
            message: 'Request Length should be 2'
        })
    }

    const newPost = await Post.create({ title, content, created_by: req.user.id })
    return res.status(201).send({
        id: newPost.id
    })
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({ id })
    if (!post) {
        return res.status(400).send({
            message: 'url id is not valid'
        })
    }
    if (post.created_by.toString() !== req.user.id.toString()) {
        return res.status(401).send({
            message: 'permission denied.'
        })
    }
    const result = await Post.deleteOne({ id })
    return res.status(204).send()
})

router.get('', async(req, res) => {
    const dbPosts = await Post.find({ created_by: req.user.id })
    const posts = []
    dbPosts.forEach((post) => {
        posts.push({
            id: post.id,
            title: post.title,
            content: post.content,
            created_by: post.created_by,
            created_at: `${post.created_at.getFullYear()}/${post.created_at.getMonth() + 1}/${post.created_at.getDate()}`,
        })
    });
    return res.status(200).send(posts)
})


router.get('/:id', async(req, res) => {
    const id = req.params.id
    const post = await Post.findOne({ id })
    if (post) {
        return res.status(200).send({
            id: post.id,
            title: post.title,
            content: post.content,
            created_by: post.created_by,
            created_at: `${post.created_at.getFullYear()}/${post.created_at.getMonth() + 1}/${post.created_at.getDate()}`,
        })
    }
    return res.status(400).send({
        message: 'url id is not valid'
    })
})

router.put('/:id', async(req, res) => {
    const body = req.body
    const title = body.title
    const content = body.content
    if (title === '') {
        return res.status(400).send({
            message: 'field `title` is not valid'
        })
    }
    if (!title || !content) {
        return res.status(400).send({
            message: 'Request Length should be 2'
        })
    }

    const id = req.params.id
    const post = await Post.findOne({ id })
    if (!post) {
        return res.status(400).send({
            message: 'url id is not valid'
        })
    }
    if (post.created_by.toString() !== req.user.id.toString()) {
        return res.status(401).send({
            message: 'permission denied.'
        })
    }

    post.title = title
    post.content = content
    await post.save()

    return res.status(204).send()
})

export default router