const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('selamat datang di aplikasi peminjaman vinnyl record')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})