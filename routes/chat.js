import Router from 'express';
import {Chat, Message} from '../model/ChatModel.js'

const router = Router();

router.get('/log', (req, res) => {
    const roomId = req.query.roomId 
    Chat.findOne({roomId: roomId})
        .then((data) => {
            if(data === null) {
                res.send([])
            }
            else {
                const chatLog = data.chatLog;
                Message.find({
                    _id: {
                        $in: chatLog
                    }
                })
                .then((data) => {
                    if (data === null) {
                        res.send([])
                    }
                    else {
                        res.send(data)
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
            }
        })
})

export default router