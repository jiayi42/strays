import express from 'express';
let db = require('./db');
var router = express.Router();

//create
router.post('/admin/stray/add/',(req,res) =>{
    let sql = `insert into stray (category_first,category_second,name,deposit,tax_deposit,weight, images,detail,freight) values (?,?,?,?,?,?,?,?,?) `;
	db.exec(sql,[req.body.category_first, req.body.category_second, req.body.name, req.body.deposit, req.body.tax_deposit, req.body.weight, req.body.images, req.body.detail, req.body.freight],
        (results,fields) => {
		res.json({
			code:0,
            message:'adding this stray  succeeds',
            data:{
                id:results.insertId
            }
		});
	});
});

//update
router.post('/admin/stray/edit/',(req,res) =>{
    let sql = `update stray set category_first=?,category_second=?,name=?,deposit=?,tax_deposit=?,weight=?, images=?,detail=?,freight=? where id=?`;
    db.exec(sql,[req.body.category_first, req.body.category_second, req.body.name, req.body.deposit,req.body.tax_deposit, req.body.weight, req.body.images, req.body.detail, req.body.freight, req.body.id],
        (results,fields) => {
		res.json({
			code:0,
            message:'revising stray info succeeds',
            data: results[0]
		});
	});
});

//read
router.get('/admin/stray/list',(req,res) => {
    
    let query = req.query;
    for(let key in query){
        if(!query[key]){
            delete query[key]
        }
    }

    //set a function to handle complex sql
    function processSql({pageSize = 10,pageIndex = 1,sortByDeposit = '',category_first = '', category_second = ''}){
        let size = pageSize;
        let count = size * (pageIndex - 1);
        let sql = `select id,name,deposit,weight, images from stray `
        if(category_first){
            sql += `where category_first = ${category_first}`;
        }

        if(category_second){
            sql += ` and category_second = ${category_second}`;
        }
        sql += ` order by deposit ${sortByDeposit} limit ${count}, ${size}`;
        console.log(sql);
        return sql;
    }
    
    
	db.exec(processSql(req.query),[],(results,fields) => {
        res.json({
            code:0,
            message:'getting stray list succeeds',
            data:results
        });   
	});
});


router.get('/admin/stray/detail/',(req,res) =>{
    let sql = `select * from stray where id = ?`;

	db.exec(sql,[req.query.id],(results,fields) => {
		res.json({
			code:0,
            message:'getting this stray info succeeds',
            data: results[0]
		});
	});
});

//delete
router.post('/admin/stray/delete/',(req,res) =>{
    let sql = `delete from stray where id = ?`;

	db.exec(sql,[req.body.id],(results,fields) => {
		res.json({
			code:0,
            message:'hope this stray has a new home',
            data: results[0]
		});
	});
});



module.exports = router;