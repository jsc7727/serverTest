const axios = require('axios');

const getRooms = () => {
    const getRoomsConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/getRooms',
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
        url: 'http://localhost:4000/api/room/getRoom',
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
        url: 'http://localhost:4000/api/room/createRoom',
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

const accessRoom = () => {
    const accessRoomConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/room/accessRoom',
        data: {
            roomId: 'mzi1ffZclHG8puYOiQbI',
            password: 'asdfqwer'
        }
    }
    axios(accessRoomConfig)
        .then(function (response) {
            console.log("roomId and RoomPassword check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const createUser = () => {
    const createUserConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/user/createUser',
        data: {
            nickname: "asdfd21", // 닉네임 (중복X)
            email: "gbs0408711@naver.com", // 로그인용 id (중복X)
            password: "sss", // 로그인용 password
            usingSns: false,
            sns: {
                provider: undefined,
                id: undefined,
            },
            numberOfGames: {
                win: 0,
                lose: 0,
            },
            report: {
                count: 0,
                time: 0,
            }
        },
    }
    axios(createUserConfig)
        .then(function (response) {
            console.log("createUser check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// const checkUserEmail = () => {
//     const checkUserEmailConfig = {
//         method: 'post',
//         url: 'localhost:4000/api/user/checkUser',
//         data: {
//             email: 'test2@google.com'
//         }
//     }
//     axios(checkUserEmailConfig)
//         .then(function (response) {
//             console.log("해당 이메일로 가입한 사람 있는지 확인 : ", response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
// checkUserEmail()



const checkEmailDuplication = () => {
    const email = "gbs040871@naver.com"
    const checkEmailDuplicationConfig = {
        method: 'get',
        url: `http://localhost:4000/api/user/checkEmailDuplication?email=${email}`,
    }
    axios(checkEmailDuplicationConfig)
        .then(function (response) {
            console.log(`해당 이메일로 가입한 사람 있는지 확인 : ${email} :`, response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
checkEmailDuplication()

const checkNicknameDuplication = () => {
    const nickname = "jj"
    const checkNicknameDuplicationConfig = {
        method: 'get',
        url: `http://localhost:4000/api/user/checkNicknameDuplication?nickname=${nickname}`,
    }
    axios(checkNicknameDuplicationConfig)
        .then(function (response) {
            console.log(`해당 닉네임으로 가입한 사람 있는지 확인 : ${nickname} : `, response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
checkNicknameDuplication()

const deleteUserFromEmail = () => {
    // 수정중
    const email = "gbs04087@naver.com"
    const deleteUserFromEmailConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/user/deleteUserFromEmail',
        data: {
            email
        }
    }
    axios(deleteUserFromEmailConfig)
        .then(function (response) {
            console.log("roomId and RoomPassword check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
// deleteUserFromEmail()

const deleteUserFromNickname = () => {
    const nickname = 'jsc';
    const deleteUserFromNicknameConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/user/deleteUserFromNickname',
        data: {
            nickname
        }
    }
    axios(deleteUserFromNicknameConfig)
        .then(function (response) {
            console.log("roomId and RoomPassword check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
deleteUserFromNickname()


// getRooms();
const test = async () => {
    // 방 생성
    const roomId = await createRoom();
    // console.log("roomId : ", roomId);
    // roomId 값으로 해당 방 정보 가져오기
    const roomObject = await getRoom(roomId);
    // console.log("room Object: ", roomObject);
}
// test();
// accessRoom();
// checkUserEmail();
// createUser();
// deleteUserFromNickname();