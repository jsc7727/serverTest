const axios = require('axios');
const { NaverStrategyFunction } = require('../Common/passport/passport.controller');

const createUser = ({ user }) => {
    const createUserConfig = {
        method: 'post',
        url: 'http://localhost:4000/api/user/createUser',
        data: user
    }
    axios(createUserConfig)
        .then(function (response) {
            console.log("createUser check : ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getUser = ({ email }) => {
    const getUserConfig = {
        method: 'get',
        url: `http://localhost:4000/api/user/getUser?email=${email}`,
    }
    axios(getUserConfig)
        .then(function (response) {
            console.log(`해당 이메일로 가입한 사람 있는지 확인: ${email} : `, response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getUserFromNickname = ({ nickname }) => {
    const getUserFromNicknameConfig = {
        method: 'get',
        url: `http://localhost:4000/api/user/getUserFromNickname?nickname=${nickname}`,
    }
    axios(getUserFromNicknameConfig)
        .then(function (response) {
            console.log(`해당 닉네임으로 가입한 사람 있는지 확인 : ${nickname} : `, response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


const checkEmailDuplication = ({ email }) => {
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

const checkNicknameDuplication = ({ nickname }) => {
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

const deleteUserFromEmail = ({ email }) => {
    // 수정중
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

const deleteUserFromNickname = ({ nickname }) => {
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


// createUser({
//     user: {
//         nickname: "test12", // 닉네임 (중복X)
//         email: "gbs0408711@naver.com", // 로그인용 id (중복X)
//         password: "sss", // 로그인용 password
//         usingSns: false,
//         sns: {
//             provider: undefined,
//             id: undefined,
//         },
//         numberOfGames: {
//             win: 0,
//             lose: 0,
//         },
//         report: {
//             count: 0,
//             time: 0,
//         }
//     },
// });
// getUser({ email: "gbs0408711@naver.com" });
// getUserFromNickname({ nickname: "asdfd21" });
// checkEmailDuplication({ email: "gbs0408711@naver.com" })
// checkNicknameDuplication({ nickname: "test1" })
// deleteUserFromEmail({ email: "gbs0408711@naver.com" })
// deleteUserFromNickname({ nickname: "test12" });
