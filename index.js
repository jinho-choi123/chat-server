import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const port = 9000

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})