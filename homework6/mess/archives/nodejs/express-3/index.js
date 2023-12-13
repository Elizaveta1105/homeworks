const express = require('express');
const moment = require('moment/moment.js');
const app = express();
const producst = require('./products.js')
const fs = require('fs/promises');
const cors = require('cors')

// app.use((req, res, next) => {
//   console.log("First middleware")
//   next()
// })

// app.use((req, res, next) => {
//   console.log("Second middleware")
//   next()
// })

app.use(cors())

app.use(async(req, res) => {
  const {method, url} = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss")

  await fs.appendFile("server.log", `\n${method} ${date}`)
  next()
})


app.get('/products', (req, res) => {
  res.json(producst)
})


app.listen(5000)