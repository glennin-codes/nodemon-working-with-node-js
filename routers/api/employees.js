const express=require('express');
const router=express.Router();
const path=require('path');
const data={};
data.employees=require('../../data/employees.json')//like connecting to a database


router.route('/')
    //reading
      .get((req,res)=>{
        res.json(data.employees);
      })
      //creating
      .post((req,res)=>{
        res.json({
                "firstname" :req.body.firstname,
                "lastname"  : req.body.lastname
        })
      })
      //apdating
      .put((req,res)=>{
        res.json({
            "firstname" :req.body.firstname,
            "lastname"  : req.body.lastname
        })
      })
      //deleting
      .delete((req,res)=>{
        res.json({"id":req.body.id})
      })
      
      router.route('/:id')
      .get((req,res)=>{
        res.json({"id":req.body.id})
      })

      module.exports=router;

