const http  = require('http');

http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end('Hello Cookie');
}).listen(12500, () => {
    console.log('ready to server on port 12500');
});

/*
/ undefined
/favicon.ico mycookie=test
*/