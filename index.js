const express = require('express'); 
const pool = require('./students'); // Assuming this is your custom database file
const app = express(); // Initialize the Express app
app.use(express.json()); // converts api list into object

// Listening to the server on port 3000
app.listen(3000, () => {
    console.log('App running on port 3000');
});

// Sample GET route
app.get('/', (req, res) => {
    res.json({message:'Rest API is working'});
});

// get api (select all data samples)
app.get('/api/Request',(req,res)=>{
    pool.query('select * from new_table',(err,results)=>{
        !(err)?res.json(results):res.status(500).json({error:'Failed to fetch user data'});
    })
})

// get api by id & last_name(select data samples by id & last_name)
app.get('/api/Request/:id/:last_name',(req,res)=>{
    let id=req.params.id
    let last_name=req.params.last_name
    pool.query('select * from new_table where id=? or last_name=?',[id,last_name],(err,results)=>{
        !(err)?res.json(results):res.status(404).json({error:'data not found'});
    })
})

// post api (insert data values at the end)
app.post('/api/Request',(req,res)=>{
    const data=[req.body.id,req.body.first_name,req.body.last_name,req.body.email]
    pool.query('insert into new_table values (?,?,?,?)',data,(err,results)=>{
        !(err)?res.json(results):res.status(404)
    })
})

// put api (insert/update data values by id)
app.put('/api/Request',(req,res)=>{
    let pair=req.body
    let data=[req.body.id, req.body.first_name, req.body.last_name, req.body.email]
    
    pool.query('update new_table set ? where id='+pair.id, pair, (err,results)=>{
        if(err){
            res.status(404)
        }
        else if(results.affectedRows==0){
            pool.query('insert into new_table values (?,?,?,?)',data, (err,results)=>{
                !(err)?res.json(results):res.status(404)
            })
        }
        else{
            res.json(results)
        }
        
    } )
})

// patch api (update data values by id)
app.patch("/api/Request",(req,res)=>{
    let data=req.body

    pool.query('update new_table set ? where id='+data.id, data, (err,results)=>{
        !(err)? res.json(results):res.status(404)
    })
})

// delete api (delete data value by id)
app.delete('/api/Request/:id',(req,res)=>{
    let id=req.params.id

    pool.query('delete from new_table where id=?', id, (err,results)=>{
        !(err)?res.json(results):res.status(404)
    })
})