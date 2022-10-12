const express=require('express')
const router=express.Router();
const path =require('path');


router.get('^/$|/index(.html)?' ,(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

router.get('^/about|/about-us(.html)',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','about-us.html'))
});
//ridirecting to homepage
router.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/index.html');
})

//if a user reaches out a page which isn't structured in the code

// router.get('/*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })
 //route handlers router.all
 router.all('*', (req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'..','views','404.html' ))
    }else if(req.accepts('json')){
        res.json({'error':'404 not found'})
    }
    else{
        res.type('txt').send('404 Not Found')
    }
 })
module.exports=router;