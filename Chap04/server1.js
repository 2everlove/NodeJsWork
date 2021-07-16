const http = require('http');

http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(12500, () => {
    console.log('ready to server on port 12500');
});

//http://localhost:12500/

//powerShell command
//node server1

//linux conmmand
//lsof -i tcp:12500 // -> processid
//kill -9 processid