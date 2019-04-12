const express = require('express');
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./api/routes/auth')
const playground = require('./api/routes/playground')


mongoose.connect('mongodb://localhost/colab',{
    useNewUrlParser:true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection noticed an error:'));
db.once('open',() =>{
console.log('Connected to colab');
});

mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/auth',auth);
app.use('/playground',playground);
// app.use('/user',userRoutes);
// middleware for errors
app.use((req,res,next) => {

        const error = new Error('Not found');
        error.status = 400;
        next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;