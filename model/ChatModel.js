import mongoose from './db.js';

const MessageSchema = new mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
    message: {type: String, required: true}, 
    timestamp: {type: Date, required: true},
})

const ChatSchema = new mongoose.Schema({
    roomId: {type: String, required: true},
    chatLog: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
})

const Message = mongoose.model("Message", MessageSchema)
const Chat = mongoose.model("Chat", ChatSchema)

export {Message, Chat}