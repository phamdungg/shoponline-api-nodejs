const express = require('express');
const port = 3000
const bodyParser = require('body-parser');
const AccountModel = require('./Models/account');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

var accountRouter = require('./routers/account')

app.use('/api/account', accountRouter)

app.get('/', (req, res, next) => {
  res.send('Trang chu')
})

app.listen(port, () => {
  console.log(`Link: http://localhost:${port}`)
})