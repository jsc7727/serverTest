const room = {
    hostname: "",
    guestNames: [],
    roomTitle: "",
    gameType: "",
    roomSecret: {
        secret: false,
        password: ""
    },
    roomLimit: 0,
}

const user = {
    name: "",
    email: "",
    id: "",
    password: "",
    numberOfGames: {
        win: 0,
        lose: 0,
    }
}


module.exports = { room, user }