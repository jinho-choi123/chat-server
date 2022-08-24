const setting_btn = document.getElementById('setting');
const changeNick = document.getElementById('nickname');
const changeRoom = document.getElementById('roomId')

const getNickname = () => {
    if (sessionStorage.getItem('nickname')) {
        return sessionStorage.getItem('nickname')
    }
    else {
        return ""
    }
}

const getRoomId = () => {
    if (sessionStorage.getItem('roomId')) {
        return sessionStorage.getItem('roomId')
    }
    else {
        return ""
    }
}

if (getNickname() === "" || getRoomId() === "") {
    //popup modal to setup.
    UIkit.modal('#modal-example').toggle();
    console.log("hello world")
}

setting_btn.onclick = (event) => {
    event.preventDefault();
    changeNick.value = getNickname()
    changeRoom.value = getRoomId()
    
}