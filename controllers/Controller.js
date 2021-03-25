const {User, DetailUser, UserVinnyl, VinnylMusic} = require('../models')
const sendmail = require('../helpers/NodeMailer')

class Controller {
    static userData (req, res) {
        User.findAll()
        .then(user => res.render('user', {user}))
        .catch(err => res.send(err))
    }
    static deleteUser(req, res){
        User.destroy({where:{id:req.params.id}})
        .then(()=>{
            res.redirect('/users')
        })
        .catch(err => res.send(err.message))
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

    static addRentGet(req, res){
        let allCustomer
        User.findAll({include:[DetailUser]})
            .then(data => {
                allCustomer = data
                return VinnylMusic.findByPk(req.params.id)
            })
            .then(data => {
                res.render('addRent', {data: data, allCustomer: allCustomer})
                // res.send([allCustomer,data])
            })
            .catch(err => res.send(err.message))
    }
    
    static addRentPost(req, res){
        UserVinnyl.create({
            VinnylMusicId: req.params.id,
            UserId:req.body.UserId,
            borrow_date:req.body.borrow_date,
            return_date:req.body.return_date
        })
        .then(data => {
            res.redirect('/vinnyl')
        })
        .catch(err => res.send(err.message))
    }

    static seeRented(req, res){
        User.findOne({where: {id:req.params.id}, include:[DetailUser, VinnylMusic]})
        .then(data => {
            // res.send(data)
            res.render('userRented', {data: data})
        })
        .catch(err => {
            res.send(err.message)
        })

    }

    static sendMail(req, res){
        User.findOne({where:{id:req.params.id}, include:[VinnylMusic]})
        .then(data =>{
            let totalPrice = 0
            data.VinnylMusics.forEach(el=> {
                let diffday = el.UserVinnyl.day_borrow
                totalPrice += diffday * el.price_perday
            })
            sendmail(data.email, `the total of your payment is ${totalPrice}`)
            res.redirect(`/user/${req.params.id}`)
        })
        .catch(err => res.send(err.message))
    }
}

module.exports = Controller