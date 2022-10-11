const {logEvents}=require('./logEvents')
const errHandler=(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errLog.txt')
    console.error(err.strack);
    res.status(500).send(err.message)
    next();
}
  module.exports=errHandler;