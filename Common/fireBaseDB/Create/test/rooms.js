
const rooms = [
    {
        hostname: "장석찬",
        guestNames: [],
        roomTitle: "너만 오면 고",
        gameType: "YUT",
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 4,
    },
    {
        hostname: "이종찬",
        guestNames: [],
        gameType: "AVALON",
        roomTitle: "너만 오면 고",
        gameType: "",
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 8,
    },
    {
        hostname: "정진",
        guestNames: [],
        roomTitle: "너만 오면 고",
        gameType: "YACHT",
        roomSecret: {
            secret: true,
            password: "1234"
        },
        roomLimit: 2,
    },
    {
        hostname: "조석영",
        guestNames: [],
        roomTitle: "너만 오면 고",
        gameType: "YACHT",
        roomSecret: {
            secret: false,
            password: ""
        },
        roomLimit: 2,
    },
]

module.exports = rooms;