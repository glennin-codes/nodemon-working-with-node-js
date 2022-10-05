const http=require('http');
const { createServer } = require('https');
const path =require('path')
const {fs ,readFileSync, rmSync}=require('fs')
const fsPromise=require('fs').promises

// const logEvents =require('./logEvents')
// const EventEmitter= require ('events')
// class Emitter extends EventEmitter{};  
// //initialize object
// const myEmitter=new Emitter();
// //add listener for the log event
// //  myEmitter.on('log',(msg)=>logEvents(msg))
 
// //     myEmitter.emit('log','log event emitted')

const PORT= process.env.PORT || 3500;
const server= http.createServer((req,res)=>{
    res.writeHead(200,{'content-Type': 'text/html'})
 if(req.url===path.join(__dirname,'views','index')){
   const home=async()=>{
    try{
          const data =await fsPromise.readFile(path.join(__dirname,'views','index'),'utf8')
         res.end(data)
    }catch (err){
     console.log(err);
    }
    
 }
 home()

}else if (req.url===path.join(__dirname ,'views' ,'about us')){
    const aboutUs=async ()=>{
        try{
            const data2=await fsPromise.readFile(path.join(__dirname ,'views' ,'about us'),'utf8')
           res.end(data2)
        }catch(err){
           console.log(err);
        }
    } 
     aboutUs();
}else{
    const outPage= async()=>{
        try{
             readFileSync(path.join(__dirname,'views','404'),'utf8',(err,dataEr)=>{
                if(err){
                    console.log(err);
                }else{
                    const data3=dataEr
                }
            })
            res.end(data3)
        }catch(err){
            console.error(err);

        }
    } 
    outPage()
}
})
server.listen(PORT, (err)=>{
    if (err){
        console.log('the was a problem '+ err);
    }
     else{
        console.log('server running at port ' + PORT);
     }
})