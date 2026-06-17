const http = require('http');

// Використовуємо port з аргументів командного рядка (process.argv[2]) 
// або змінну оточення process.env.PORT, або дефолтне значення 3000
const port = process.argv[2] || process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});