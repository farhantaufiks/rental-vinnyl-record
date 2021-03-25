const Controller = require('../../controllers/Controller')
const Authenticator = require('../../controllers/authenticator')
const router = require('express').Router()

const session = require('express-session')

router.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
}))



const isAdminMiddleware = (req,res,next) =>{
  if(req.session.isAdmin == true){
    next();
  } else {
    res.redirect(`/user/${req.session.idUser}`)
    // res.render('userSandbox')
  }
}

router.get('/:id', Controller.seeRented)
router.post('/:id/mail', Controller.sendMail)

router.use(isAdminMiddleware)

router.get('/', Controller.userData)
router.get('/:id/delete', Controller.deleteUser)

module.exports = router