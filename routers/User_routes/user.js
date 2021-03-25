const Controller = require('../../controllers/Controller')
const router = require('express').Router()

router.get('/register', Controller.getRegister)


module.exports = router