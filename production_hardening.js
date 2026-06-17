const http = require('http');

const port = process.argv[2] || process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Додавання обов'язкових безпекових заголовків
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Обробка OPTIONS для CORS
  if (req.method === 'OPTIONS' && req.url === '/health') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Маршрут /health
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // Маршрут /boom (симуляція внутрішньої помилки)
  if (req.method === 'GET' && req.url === '/boom') {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});