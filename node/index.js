import express from 'express';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var path = require('path');
var config = require("./app/config");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//login api
app.use((req,res,next) =>{
    // set token for auth
    let token = req.get('Authorization');

    console.log(req.path);
    if(req.path === '/api/user/login' || 
       req.path === '/api/user/register'
    ){
        next();
    }else{
        jwt.verify(token,"secret",(err,decode) =>{
            if(err){
                res.status(403).send('Authorization Fails, pls login again.');
            }else{
                next();
            }
        })
    }

});

//other webs api
app.use('/api',require('./app/user'));
app.use('/api',require('./app/upload'));
app.use('/api',require('./app/category'));
app.use('/api',require('./app/stray'));

// find database in config and start listen port
app.listen(config.PORT,() => {
    console.log('service activated:8000');
});