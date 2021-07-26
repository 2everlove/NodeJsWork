const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false})
    .then(() => {
        console.log("Database connection successful");
    })
    .catch(err => {
        console.log(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'puablic')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} Router does not exist`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log("Waiting on port ",app.get('port'));
});
