import { initDb } from './db'

const SECRET_KEY = 'AOISDHPIDF_SADOFI_Q3452_34NP23I5V234_23O4VB2345';
const POST_COUNTER_ID = 'postCounter'
const USER_COUNTER_ID = 'userCounter'
const SHOULD_ERASE_BEFORE_RUN = false

export {
    SECRET_KEY,
    POST_COUNTER_ID,
    USER_COUNTER_ID,
    SHOULD_ERASE_BEFORE_RUN,
    initDb,
}