const router = require('express').Router()
const user_routes = require('./User_routes/user')
const vinnyl_routes = require('./Vinnyl_routes/vinnyl')

router.use('/user', user_routes)
router.use('/vinnyl', vinnyl_routes)

module.exports = router