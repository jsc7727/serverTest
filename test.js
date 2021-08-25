const axios = require('axios');


const getRooms = () => {
    const getRoomsConfig = {
        method: 'post',
        url: 'localhost::4000/getRooms',
        headers: {}
    };
    axios(getRoomsConfig)
        .then(function (response) {
            console.log("방 목록 가져오기 : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getRoom = async (roomId) => {
    const getRoomConfig = {
        method: 'post',
        url: 'localhost::4000/getRoom',
        data: {
            roomId
        }
    }
    try {
        const roomObject = await axios(getRoomConfig);
        return roomObject.data;
    }
    catch (error) {
        console.error(error)
        return {}
    }
}


const createRoom = async () => {
    const createRoomConfig = {
        method: 'post',
        url: 'localhost::4000/createRoom',
        data: {
            hostname: "테스트",
            guestList: [],
            roomTitle: "테스트2",
            gameType: "yut",
            play: false,
            secret: false,
            password: "asdfqwer",
            roomLimit: 0,
        }
    };
    axios(createRoomConfig)
    try {
        const roomId = await axios(createRoomConfig);
        console.log("생성 id: ", roomId.data);
        return roomId.data;
    }
    catch (error) {
        console.error(error)
        return ""
    }
}


const checkUserEmail = () => {
    const checkUserEmailConfig = {
        method: 'get',
        url: 'localhost::4000/checkUser?email=test2@gmail.com',
    }
    axios(checkUserEmailConfig)
        .then(function (response) {
            console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


// getRooms();
const test = async () => {
    const roomId = await createRoom();
    console.log("roomId : ", roomId);
    const roomObject = await getRoom(roomId);
    console.log("room Object: ", roomObject);
}
test();
// checkUserEmail();
