const express= require('express')
const path =require('path')
const router=express.Router();

router.get('^/$|/index(.html)?',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
    next();
})
router.get('/test(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','test.html'))
})
router.get('/newpage(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..' ,'views', 'newpage.html'))
})
module.exports=router;