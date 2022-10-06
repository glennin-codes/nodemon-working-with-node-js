const express = require('express');
const app=express();
const path=require ('path');
const PORT= process.env.PORT||3500

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })
// app.listen(PORT,()=>{
//     console.log(`server running at port ${P}`);
// })
//making the extension optional in the borwser if its index(.html)?
app.get('^/$|/index(.html)?' ,(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('^/about|/about-us(.html)',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','about-us.html'))
});
//riodirecting to homepage
app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/index.html');
})
//if a user reaches out a page which isn't structured in the code

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})
app.listen(PORT, ()=>console.log('server running at port ', PORT))
