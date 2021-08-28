const router = require('express').Router()
// const authMiddleware = require('../../middlewares/auth')
const user = require('./user')
const room = require('./room')


// router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/room', room)


module.exports = router