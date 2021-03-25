const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
const routes = require('./routers/index')
const Authenticator = require('./controllers/authenticator')

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
}))

app.get('/login', Authenticator.loginGet)
app.post('/login', Authenticator.loginPost)
app.get('/logout', Authenticator.logout)

const isLoginMiddleware = (req,res,next) =>{
  if(req.session.isLogin == true){
    next();
  }else{
    res.redirect('/login')
  }
}
const isAdminMiddleware = (req,res,next) =>{
  if(req.session.isAdmin == true){
    next();
  } else {
    res.render('userSandbox')
  }
}


app.use(isLoginMiddleware)


app.get('/', isAdminMiddleware, (req, res) => {
  res.send('selamat datang di aplikasi peminjaman vinnyl record')
})
app.get('/home', isAdminMiddleware, (req, res) => {
  res.send('Anda telah masuk sebagai Admin')
})
app.get('/user/1', (req, res) => {res.render('userSandbox')})

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})