import mongoose from 'mongoose'

import Counter from './counter'
import { POST_COUNTER_ID } from '../config/index'

const postSchema = mongoose.Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    created_by: {
        type: String,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

postSchema.pre('save', function (next) {
    const doc = this
    if (doc.id) {
        next()
    }
    Counter.findByIdAndUpdate({ _id: POST_COUNTER_ID }, { $inc: { seq: 1 } }, (error, counter) => {
        if (error)
            return next(error)
        doc.id = counter.seq
        next()
    })
})

const Post = mongoose.model('Post', postSchema)

export default Post