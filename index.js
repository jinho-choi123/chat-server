import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import cors from 'cors'

const __dirname = path.resolve()
const port = 9000

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/static/chat.html')
})



io.on('connection', (socket) => {
    //socket.broadcast.emit('enter', 'somebody entered the chat')

    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit('leave', 'somebody left the chat')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})



httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})