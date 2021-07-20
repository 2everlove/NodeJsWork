const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello, Express');
});

app.listen(app.get('port'), () => {
    console.log('ready to', app.get('port'), 'port');
})

/*
$ npm start

> learn-express@1.0.0 start C:\PracticeWorks\NodeJsWork\learn-express
> nodemon app

[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
ready to 3000 port

*/