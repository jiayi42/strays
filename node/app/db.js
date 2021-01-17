const config = require("./config");
var mysql = require('mysql');

//fill the set for the pool for connection to database
var pool = mysql.createPool({
    connectionLimit:10,
    host:config.DB_HOST,
    user:config.DB_USER,
    password:config.DB_PASSWORD,
    database:config.DB_NAME,
    multipleStatements:true,
});

//start connect
let exec = (sql,params = [],callBack) => {

    pool.getConnection((err,conn) => {
        if(err){
            console.log(err.message);
        }
        conn.query(sql,params,(error,results,fields) => {
            conn.release();
            if(error){
                console.log(error.message);
            }
            if(callBack){
                callBack(results,fields);
            }
        });
    })
};

module.exports = {
    exec,
}