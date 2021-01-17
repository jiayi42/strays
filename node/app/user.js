import express from 'express';
let db = require('./db');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/user/login',(req,res) =>{
    let {username,password} = req.body;
    console.log(username);
    let sql = `select * from manage_user where username = ? and password = ?`;
    db.exec(sql,[username,password],(results,fields) => {
        console.log(results[0]);
        if(!results.length){
            res.json({
                code:1000,
                message:"username or password error",
                data:results,
            });
            return false;
        }

        let {id} = results[0];
        let payload = {
            id,
            username,
        }

        // "1d" "20h" 60
        let token = jwt.sign(payload,'secret',{expiresIn:'356d'});
        console.log("generated token:" + token);
        res.json({
            code:0,
            message:"login succeeds",
            data:{
                token,
                id,
                username:results[0]['username'],
                mobile:results[0]['mobile'],
                address:results[0]['address'],
                head_image:results[0]['head_image'],
            },
        });

    });
});

router.get('/admin/user/list',(req,res) =>{
   
    let sql = `select id,username,head_image,mobile,address from manage_user order by id`;
    db.exec(sql,[],(results,fields) => {
        if(!results.length){
            res.json({
                code:1002,
                message:"fetch user list success",
                data:results,
            });
            return false;
        }

        res.json({
            code:0,
            message:"fetch success",
            data:results,
        });

    });
});

module.exports = router;