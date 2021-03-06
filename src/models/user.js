import mongoose from 'mongoose'

import { USER_COUNTER_ID } from '../config'
import Counter from './counter'

const userSchema = mongoose.Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    const doc = this
    if (doc.id) {
        next()
    }
    Counter.findByIdAndUpdate({ _id: USER_COUNTER_ID }, { $inc: { seq: 1 } }, (error, counter) => {
        if (error)
            return next(error)
        doc.id = counter.seq
        next()
    })
})

const User = mongoose.model('User', userSchema)

export default User