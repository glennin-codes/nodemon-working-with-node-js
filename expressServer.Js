const express = require('express');
const app=express();
const path=require ('path');
const PORT= process.env.PORT||3000;


app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})