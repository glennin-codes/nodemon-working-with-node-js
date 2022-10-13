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