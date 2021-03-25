const router = require('express').Router()
const Controller =require('../../controllers/Controller')
const session = require('express-session')
const sendmail = require('../../helpers/NodeMailer')

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
  }
}

router.use(isAdminMiddleware)

router.get('/', Controller.vinnylData)
router.get('/add', Controller.formVinnyl)
router.post('/add', Controller.addVinnyl)
router.get('/delete/:id', Controller.deleteVinnyl)
router.get('/edit/:id', Controller.formEditVinnyl)
router.post('/edit/:id', Controller.editVinnyl)
router.get('/addrent/:id', Controller.addRentGet)
router.post('/addrent/:id', Controller.addRentPost)

module.exports = router
