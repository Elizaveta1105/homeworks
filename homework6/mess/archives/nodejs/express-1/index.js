const express = require('express');
const app = express();

//если приходит гет запрос на адрес / -- выполнить эту фу-цию
//гет запрос по этому адресу будет обрабботан этой ф-уией
app.get("/", (request, response) => {
  response.send("<h2>Home page</h2>")
})

app.listen(4000)