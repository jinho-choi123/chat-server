import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport'
import 'dotenv/config';
import authRouter from './routes/auth.js';
import chatRouter from './routes/chat.js'

const __dirname = path.resolve()
const port = 9000

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
}
))
app.use(expressSession({
    secret: process.env.SESSION_SECRETS,
    cookie: {
        maxAge: 2*60*60*1000
    },
    name: 'chatSession'
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter)
app.use('/chat', chatRouter)


io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit('leave', 'somebody left the chat')
    })

    socket.on('join-attempt', (loginData) => {
        console.log(loginData)
        socket.join(loginData.roomId)
        const timestamp = Date.now()
        io.to(loginData.roomId).emit('message', {nickname: "chatbot", message: `${loginData.nickname} entered the chat`, timestamp: timestamp })
    })

    socket.on('message', (msg) => {
        console.log(msg)
        const timestamp = Date.now()
        //store the log into db
        const chat = new Message({
            author: msg.nickname,
            message: msg.message,
            timestamp: timestamp,
        })
        chat.save()
            .then(() => {
                Chat.updateOne(
                    {
                        roomId: msg.roomId,
                    },
                    {
                        $push: {
                            chatLog: chat,
                        },
                    },
                    { upsert: true }
                )
                .then(() => {
                    io.emit('message', { ...msg, timestamp: timestamp })
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    })
})



httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})