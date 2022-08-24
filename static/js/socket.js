const join_btn = document.getElementById('join')
const msg_box = document.getElementById('chat-msg')
const changeNick = document.getElementById('nickname');
const changeRoom = document.getElementById('roomId')

//

const socket = io('http://121.167.235.122:9000');

join_btn.onclick = (event) => {
    event.preventDefault();
    console.log("pressed join btn")
    sessionStorage.setItem('nickname', changeNick.value);
    sessionStorage.setItem('roomId', changeRoom.value);
    UIkit.modal('#modal-example').hide()
    socket.on('connect', () => {
        console.log("socket connected")

        socket.on("disconnect", (reason) => {
            console.log("socket disconnected")
        })
    })
    
}

