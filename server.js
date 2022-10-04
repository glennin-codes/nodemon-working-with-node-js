const http=require('http');
const { createServer } = require('https');
// const path =require('path')
// const fs=require('fs')
// const fsPromise=require('fs').promises

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
    res.write('hello world');
    res.end();
 
})
server.listen(PORT, (err)=>{
    if (err){
        console.log('the was an problem '+ err);
    }
     else{
        console.log('server running at port ' + PORT);
     }
})