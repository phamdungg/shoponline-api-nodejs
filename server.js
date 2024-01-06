const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { db_connect } = require ('./config/db.config');


//connect db
db_connect();

const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

var accountRouter = require('./routers/account.router')
app.use('/api/account', accountRouter)

var danhmucRouter = require('./routers/danhmuc')
app.use('/api/danhmuc', danhmucRouter)

var sanphamRouter = require('./routers/sanpham')
app.use('/api/sanpham', sanphamRouter)

app.get('/', (req, res, next) => {
  res.send('Trang chu')
})

app.listen(port, () => {
  console.log(`Link: http://localhost:${port}`)
})