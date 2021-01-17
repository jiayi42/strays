import express from 'express';
let db = require('./db');
var router = express.Router();

//read
router.get('/admin/category/all',(req,res) =>{
   
    let sql = `select * from category`;
    db.exec(sql,[],(results,fields) => {
        
        res.json({
            code:0,
            message:"listing category succeeds",
            data:results,
        });

    });
});

//create
router.post('/admin/category/add',(req,res) =>{
    let {name,pid,level,image} = req.body;
    let sql = `insert into category (name,pid,level,image) values (?,?,?,?)`;
    db.exec(sql,[name,pid,level,image],(results,fields) => {
        
        res.json({
            code:0,
            message:"adding category succeeds",
            data:{
                id:results.insertId
            }
        });

    });
});

//update
router.post('/admin/category/edit',(req,res) =>{
    let {name,pid,level,image,id} = req.body;
    let sql = `update category set name = ?,pid = ?, level = ?, image = ? where id = ?`;
    db.exec(sql,[name,pid,level,image,id],(results,fields) => {
        
        res.json({
            code:0,
            message:"updating category succeeds"
        });

    });
});


//delete
router.post('/admin/category/delete',(req,res) =>{
   
    let sql = `delete from category where id = ?`;
    db.exec(sql,[req.body.id],(results,fields) => {
        
        res.json({
            code:0,
            message:"deleting category succeeds"
        });

    });
});

//read sub category
router.get('/admin/category/sub',(req,res) =>{
   
    let sql = `select * from category where pid = ?`;
    db.exec(sql,[req.query.pid],(results,fields) => {
        
        res.json({
            code:0,
            message:"getting category succeeds",
            data:results
        });

    });
});



module.exports = router;