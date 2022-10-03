
const {format} = require('date-fns');
const {v4:uuid}=require('uuid')

 const path =require('path')
 const fs =require('fs');
 const fsPromises=require('fs').promises

 const logEvents=async(messages)=>{
    const  dateTime= `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}` 
    const logItem=`${dateTime}\t ${uuid}\t ${messages}`
    try{
        if (!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','log.txt'),logItem)
    }catch (err){
        console.error(err);
    }
 }
 