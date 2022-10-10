
const {format} = require('date-fns');
const { v4:uuid}= require('uuid')

 const path =require('path')
 const fs =require('fs');
 const fsPromises=require('fs').promises

 const logEvents  = async(messages,logName)=> {
    const  dateTime= `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}` 
    const logItem=`${dateTime}\t${uuid()}\t ${messages}\n`
    console.log(logItem);
    try{
        if (!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem)
    }catch (err){
        console.error(err);
    }
 }
 const logger = ((req,res,next)=>{
    logEvents(`${req.method}\t ${req.header.origin}\t ${req.url}`,'reqLog.txt')
    console.log(`${req.method},${req.path} `);
    next();
})
module.exports= {logger, logEvents}