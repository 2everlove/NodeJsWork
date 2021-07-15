const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
}).listen(12500, () => {
    console.log('ready to server on port 12500');
});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
}).listen(12501, () => {
    console.log('ready to server on port 12501');
});

//http://localhost:12500/
//http://localhost:12501/

//multi server
//window command
//netstat - ano \ findstr 12500 -- processid
//taskkill /pid processid /f