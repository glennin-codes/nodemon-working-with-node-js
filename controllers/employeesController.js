const data ={};
data.employees=require('../model/employees.json')


const readingEmployees= (req,res)=>{
    res.json(data.employees);
  }
  const creatingEmployees=(req,res)=>{
    res.json({
            "firstname" :req.body.firstname,
            "lastname"  : req.body.lastname
    })
  }
  const updatingEmployees=(req,res)=>{
    res.json({
        "firstname" :req.body.firstname,
        "lastname"  : req.body.lastname
    })
  }
  const deletingEmployees=(req,res)=>{
    res.json({"id":req.body.id})
  }
  const readingParticularEmp=(req,res)=>{
    res.json({"id":req.body.id})
  }
  

  module.exports={
      readingEmployees,
      creatingEmployees,
      updatingEmployees,
      deletingEmployees,
      readingParticularEmp
  }