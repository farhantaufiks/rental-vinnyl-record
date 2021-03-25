const {User, DetailUser, UserVinnyl, VinnylMusic} = require('../models')

class Controller {
    static userData (req, res) {
        User.findAll()
        .then(user => res.render('user', {user}))
        .catch(err => res.send(err))
    }
    static getRegister(req, res) {
        res.render('register')
    }
    static register(req, res) {
        const {status, username, password, email } = req.body
        User.create({status, username, password, email })
        .then(user => res.redirect('/user'))
        .catch(err => res.send(err))
    }
    static getLogin(req, res) {
        
    }
    static postLogin(req, res) {
        
    }
    static vinnylData(req,res) {
        VinnylMusic.findAll()
        .then(vinnyl => res.render('vinnyl', {vinnyl}))
        .catch(err => res.send(err))
    }
    static formVinnyl(req, res) {
        res.render('addVinnyl')
    }
    static addVinnyl(req, res) {
        const {name, genre, singer, released_year, cover_url, restriction_age, price_perday} = req.body
        VinnylMusic.create({name, genre, singer, released_year, cover_url, restriction_age, price_perday})
        .then(vinnyl => res.redirect('/vinnyl'))
        .catch(err => res.send(err))
    }
    static deleteVinnyl(req, res) {
        VinnylMusic.destroy({
            where : {
                id: req.params.id
            }
        })
        .then(vinnyl => res.redirect('/vinnyl'))
        .catch(err => res.send(err))
    }
    static formEditVinnyl(req, res) {
        let id = req.params.id
        VinnylMusic.findByPk(id)
        .then(vinnyl => res.render('editVinnyl', {vinnyl}))
        .catch(err => res.send(err))
    }
    static editVinnyl(req, res) {
        const {name, genre, singer, released_year, cover_url, restriction_age, price_perday} = req.body
        console.log(req.body, '<< req.body');
        VinnylMusic.update({name, genre, singer, released_year, cover_url, restriction_age, price_perday}, {
           where:{
            id: req.params.id
           } 
        })
        .then(vinnyl => res.redirect('/vinnyl'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller