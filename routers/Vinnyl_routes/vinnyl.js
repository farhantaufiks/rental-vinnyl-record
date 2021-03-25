const router = require('express').Router()
const Controller =require('../../controllers/Controller')

router.get('/', Controller.vinnylData)
router.get('/add', Controller.formVinnyl)
router.post('/add', Controller.addVinnyl)
router.get('/delete/:id', Controller.deleteVinnyl)
router.get('/edit/:id', Controller.formEditVinnyl)
router.post('/edit/:id', Controller.editVinnyl)

module.exports = router
