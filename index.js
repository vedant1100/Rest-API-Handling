const express=require('express');
const run=express();
const students=require('./students');
run.use(express.json());

run.listen(3000,()=>{
    console.log('app is running on port 3000');
})

run.get('/',(req,res)=>{
    res.json('Welcome');
})

run.get('/students',(req,res)=>{
    res.json(students);
})

run.post('/students',(req,res)=>{
    const user={
        id:req.body.id,
        first_name : req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }
    students.push(user);
    res.json(user);
})

run.put('/students/:id',(req,res)=>{
    let id=req.params.id
    let first_name=req.body.first_name
    let last_name=req.body.last_name
    let email=req.body.email

    let index=students.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })

    if(index>=0){
        let std=students[index]
        std.first_name=first_name
        std.last_name=last_name
        std.email=email
        res.json(std)   
    }
    else{
        res.status(404)
    }
})

run.delete('/students/:id',(req,res)=>{
    let id=req.params.id

    let index=students.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })

    if(index>=0){
        let deleted_id=students[index]
        students.splice(index,1)
        res.json(deleted_id)
    }
    else{
        res.json(404)
    }
})

run.patch('/students/:id',(req,res)=>{
    let id=req.params.id
    let first_name=req.body.first_name
    let last_name=req.body.last_name
    let email=req.body.email

    let index=students.findIndex((student)=>{
        return (student.id==Number.parseInt(id))
    })

    if(index>=0){
        let std=students[index]
        if(first_name)
            std.first_name=first_name

        if(last_name)
            std.last_name=last_name

        if(email)
            std.email=email

        res.json(std)
    }
    else{
        res.status(404)
    }
})