const fs = require('fs');
const mail = "farhantaufiks@gmail.com"
const password = "0226623647"
const status = 'admin'


class Authenticator{
  static loginGet(req,res) {
    res.render('./login.ejs')
  }
  static loginPost(req, res){
    console.log(req.body)
    if(req.body.mail == mail){
      if (req.body.password == password){
        req.session.isLogin = true
        if(status == 'admin'){
          req.session.isAdmin = true
          res.redirect('/home')
        } else {
          res.redirect('/user/1') // 1 akan digantikan dengan ID dari User
        }
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/register')
    }
  }
  static logout (req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}

module.exports = Authenticator