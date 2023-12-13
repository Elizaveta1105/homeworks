const express = require('express');
const app = express();
const producst = require('./products.js')

app.get('/products', (req, res) => {
  res.json(producst)
})//ф-ция обработчик или контроллер


app.listen(5000)