var axios = require('axios');

var config = {
    method: 'get',
    url: 'localhost::4000/getRooms',
    headers: {}
};

var config2 = {
    method: 'post',
    url: 'localhost::4000/createRoom',
    data: {
        hostname: "테스트",
        guestnames: [],
        roomTitle: "테스트트트트",
        gameType: "yut",
        play: false,
        secret: false,
        password: "asdfqwer",
        roomLimit: 0,
    }
};

// axios(config)
//     .then(function (response) {
//         console.log("방 목록 가져오기 : ", response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });



axios(config2)
    .then(function (response) {
        console.log("생성 id: ", response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

