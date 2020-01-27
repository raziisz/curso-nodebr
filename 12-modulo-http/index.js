const http = require('http');

http.createServer((req, res) => {
  res.end('Hello Node xD!!!');
})
.listen(5000, () => console.log('o servidor está rodando'))