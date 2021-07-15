const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, {'Content-type': 'text/html; cahrset = utf-8'});
        res.end(data);
    } catch (err){
        console.log(err);
        res.writeHead(500, {'Content-type': 'text/html; cahrset = utf-8'});
        res.end(err.message);
    }
}).listen(12500, () => {
    console.log('ready to server on port 12500');
});

//http://localhost:12500/