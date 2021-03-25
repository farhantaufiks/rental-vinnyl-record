const {User, DetailUser, UserVinnyl, VinnylMusic} = require('../models')

class Authenticator{

  static loginGet(req,res) {
    res.render('./login.ejs')
  }

  static loginPost(req, res){
    console.log(req.body)
    User.findOne({
      where: { email: req.body.mail}
    })
      .then(data => {
        if(data){
          if(data.password == req.body.password){
            req.session.isLogin = true
            req.session.idUser = data.id
            if(data.status == 'admin'){
              req.session.isAdmin = true
              res.redirect('/user')
            } else {
              res.redirect(`/user/${data.id}`)
            }
          } else {
            res.send('PASSWORD IS INCORRECT')
          }
        }else{
          res.send('EMAIL IS INCORRECT')
        }
      })
      .catch( err => {
        res.send(err.message)
      })
  }

  static logout (req, res) {
    req.session.destroy()
    res.redirect('/login')
  }

  static getRegister(req, res) {
    res.render('register')
  }
  static postRegister(req, res) {
    DetailUser.create({
      name:req.body.name,
      KTP:req.body.ktp,
      age:req.body.age,
    })
    .then(data => {
      console.log('DetailUserberhasildibuat')
      return User.create({
            status:req.body.status,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            DetailUserId: data.id
        })
    })
    .then(data => {
      console.log('User Berhasil Dibuat')
      res.redirect('/user')
    })
    .catch(err => {
      if(err.name == "SequelizeValidationError"){
        let er = []
        err.errors.forEach(el => er.push(el.message))
        res.send(er)
      } else {
        res.send(err.message)
      }
    })
  }
}

module.exports = Authenticator