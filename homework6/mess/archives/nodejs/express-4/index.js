const express = require('express');
const app = express();
const cors = require('cors')
const productsRouter = require('./routes/api/products')

app.use(cors());
app.use('/api/products', productsRouter)// есди адрес начинается с, тогда ищи в обработчике productsRouter
app.use(express.json())


app.listen(5000)