const express=require('express');
const router=express.Router();
const path=require('path');
const employeesController=require('../../controllers/employeesController')

router.route('/')
    //reading
      .get(employeesController.readingEmployees)
      //creating
      .post(employeesController.creatingEmployees)
      //apdating
      .put(employeesController.updatingEmployees)
      //deleting
      .delete(employeesController.deletingEmployees)
      
      router.route('/:id')
      .get(employeesController.readingParticularEmp)

      module.exports=router;

