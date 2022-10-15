const userDb={
   users: require("../model/users.json")
}

const bcrypt=require('bcrypt')
const loginHandle = async(req,res)=>{
    const  {user,pwd}=req.body;
    if (!user || !pwd){
        return res.status(400).json({'message':"user and password required"});

    }
    const findUser = userDb.users.find(person=>person.username===user)
    if (!findUser){
        return res.sendStatus(401);//unauthorized

    }
    try{
        const match=await bcrypt.compare(pwd,findUser.password);
        if(match){
            res.status(201).json({'succes':`user ${user} login succesful`})
        }else{
            res.sendStatus(401);
        }

    }catch(err){
        res.status(500).json({"message":err.message})
    }

}


module.exports={loginHandle};