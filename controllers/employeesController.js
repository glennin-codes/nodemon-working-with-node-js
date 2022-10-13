const { parse } = require('date-fns');

const data ={
  employees:require('../model/employees.json'),
  setEmployees:function(data){
    this.employees=data 
  }
}


const readingEmployees= (req,res)=>{
    res.json(data.employees);
  }
  const creatingEmployees=(req,res)=>{
      const newEmployee={
        id:data.employees[data.employees.length -1].id+1 || 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
      }
      if(!newEmployee.firstname||!newEmployee.lastname){
        return(res.status(400).json({message:'first and last name are required'}))
      }
      data.setEmployees([...data.employees,newEmployee]);
      res.status(201). json(data.employees)
  }
  const updatingEmployees=(req,res)=>{
    const employee=data.employees.find(emp=>{emp.id===parseInt(req.body.id)});
    if(!employee){
      return res.status(400).json({"message":`employee  ${req.body.id}  cant' be found`});
    }
    if(req.body.firstname) employee.firstname=req.body.firstname;
    if(req.body.lastname) employee.lastname=req.body.lastname;
    const filterdArray=data.employees.filter(emp=>emp.id !== parseInt(req.body.id))
    const unSortedArray=[...filterdArray,employee];
    data.setEmployees(unSortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0))  
    
    res.status(201).json(data.employees)
  }
  const deletingEmployees=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id===parseInt(req.body.id));
    if(!employee){
      res.status(401).json({"messages":`employee ${req.body.id} cant be found`});

    }
      const filterdArray=data.employees.filter(emp=>emp.id !==parseInt(req.body.id));
      data.setEmployees([...filterdArray])
      res.json(data.employees)
    }
  const readingParticularEmp=(req,res)=>{

  }
  

  module.exports={
      readingEmployees,
      creatingEmployees,
      updatingEmployees,
      deletingEmployees,
      readingParticularEmp
  }