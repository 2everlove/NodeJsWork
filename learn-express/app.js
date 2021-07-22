const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path'); //path

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('require path', express.static(path.join('real path')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(cookieParser(secret key));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('The upload folder does not exist, so create the upload folder.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',
    upload.fields([{name: 'image1'}, {name: 'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

//middleware
app.use((req, res, next) => {
    console.log('execute all requests');
    next();
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.get('/', (req, res, next) => {
    console.log('GET / when request, excute');
    next();
}, (req, res) => {
    throw new Error('error will process on middleware of error process');
});
/* app.get('/', (req, res) => {
    //res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html'));
}); */

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
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

http://localhost:3000/

-------------------------
# after middleware
$ npm start

> learn-express@1.0.0 start C:\PracticeWorks\NodeJsWork\learn-express
> nodemon app

[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
ready to 3000 port
execute all requests
GET / when request, excute
Error: error will process on middleware of error process
    at C:\PracticeWorks\NodeJsWork\learn-express\app.js:18:11
    at Layer.handle [as handle_request] (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\route.js:137:13)
    at C:\PracticeWorks\NodeJsWork\learn-express\app.js:16:5
    at Layer.handle [as handle_request] (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\route.js:137:13)
    at Route.dispatch (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\route.js:112:3)
    at Layer.handle [as handle_request] (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\layer.js:95:5)
    at C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\index.js:281:22
    at Function.process_params (C:\PracticeWorks\NodeJsWork\learn-express\node_modules\express\lib\router\index.js:335:12)


-------------------
$ npm i morgan cookie-parser express-session dotenv
GET / 500 13.283 ms - 49

-------------------
$ npm i body-parser

-------------------
$ npm i multer
multipart.html

http://localhost:3000/upload

GET /upload 200 3.118 ms - 272
[Object: null prototype] {
  image1: [
    {
      fieldname: 'image1',
      originalname: 'LostArk_Mobile_BG_Mokoko_01.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: 'uploads/',
      filename: 'LostArk_Mobile_BG_Mokoko_011626769535773.png',
      path: 'uploads\\LostArk_Mobile_BG_Mokoko_011626769535773.png',
      size: 22437
    }
  ],
  image2: [
    {
      fieldname: 'image2',
      originalname: 'LostArk_Mobile_BG_Mokoko_02.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: 'uploads/',
      filename: 'LostArk_Mobile_BG_Mokoko_021626769535774.png',
      path: 'uploads\\LostArk_Mobile_BG_Mokoko_021626769535774.png',
      size: 22098
    }
  ]
} [Object: null prototype] { tilte: 'dd' }
POST /upload 200 18.349 ms - 2

*/