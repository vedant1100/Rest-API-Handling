const {createPool}=require('mysql2');

const pool=createPool({
    host:'localhost',
    user:'root',
    password:'Vedant@123',
    database:'apiint',
    connectionLimit:5,
})

// pool.query(`select * from new_table where id>3`,(err,result,fields)=>{
//     if(err){
//         return console.log(err);
//     }
//     return console.log(result);
// })

module.exports=pool;
