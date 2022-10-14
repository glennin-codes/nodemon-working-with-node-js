const userDb={
    users:require('../model/users.json'),
    setUsers:function (data){this.users=data}
}
const fsPromise=require('fs').promises;
const path =require ('path');
const bcrypt=require('bcrypt');


const handleNewUser= async (req,res)=>{
    const {user,pwd} = req.body;
    //checking for completeing form 
    if(!user || !pwd){
        return  res.status(400).json({"message":"username and password required"});
    }
    //checking for duplicate username
    const duplicate= userDb.users.find(person=>person.username === user)
    if(duplicate){
        return res.sendStatus(409)//conflicting
    }
    try{
        //encrypt pwd
        const hashpwd= await bcrypt.hash(pwd,10);
        //storing data
        const newUser={
            "username":user,
            "password":hashpwd};
        userDb.setUsers([...userDb.users,newUser]);

        await fsPromise.writeFile( 
            path.join(__dirname,'..','model','users.json'),
             JSON.stringify(userDb.users)
        );
        console.log(userDb.users);
        res.status(201).json({'succes':`welcome ${user} `})



    }catch(err){
       res.status(500).json({'message': err.message})
    }
}
module.exports= {handleNewUser};