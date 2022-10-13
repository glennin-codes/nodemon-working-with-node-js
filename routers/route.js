const { default: areIntervalsOverlapping } = require('date-fns/areIntervalsOverlapping/index');
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

module.exports=router;