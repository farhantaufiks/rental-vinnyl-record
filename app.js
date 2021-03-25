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

app.get('/', (req, res) => {
  res.render('homepage')
})
app.get('/login', Authenticator.loginGet)
app.post('/login', Authenticator.loginPost)
app.get('/logout', Authenticator.logout)
app.get('/register', Authenticator.getRegister)
app.post('/register', Authenticator.postRegister)

const isLoginMiddleware = (req,res,next) =>{
  if(req.session.isLogin == true){
    next();
  }else{
    res.redirect('/login')
  }
}


app.use(isLoginMiddleware)

app.use(routes)

// app.get('/', isAdminMiddleware, (req, res) => {
//   res.send('selamat datang di aplikasi peminjaman vinnyl record')
// })
// app.get('/home', isAdminMiddleware, (req, res) => {
//   res.send('Anda telah masuk sebagai Admin')
// })
// app.get('/user/1', (req, res) => {res.render('userSandbox')})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})