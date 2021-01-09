import mongoose from 'mongoose'

import { POST_COUNTER_ID, USER_COUNTER_ID } from '../config/index'

const CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})

const Counter = mongoose.model('counter', CounterSchema)

export default Counter