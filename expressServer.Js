
const express = require('express');
const app=express();
const path=require ('path');
const {logger}=require('./middleware/logEvents')
const errHandler=require('./middleware/errHandler')
const cors = require('cors')
const {corsOption}=require('./config/corsOption')
const router=require('./routers/subdir')
const PORT= process.env.PORT||3500





app.use(cors(corsOption));  
//using middware
//built in url to urlencoded data
//to handle form data
app.use(express.urlencoded({extended:false}))

app.use(express.json())
//sending static files

app.use('/',express.static(path.join(__dirname,'/public')))
app.use( '/subdir',express.static(path.join(__dirname, '/public')))


//using routers
//working with rest api's
app.use('/',require('./routers/route'))
app.use('/subdir',require('./routers/subdir'))
app.use('/employees',require('./routers/api/employees'))

app.all('*', (req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html' ))
    }else if(req.accepts('json')){
        res.json({'error':'404 not found'})
    }
    else{
        res.type('txt').send('404 Not Found')
    }
 })//using custom middleware
app.use(logger)


// app.get('/',(req,res)=>{ 
//     res.send('hello world')
// })
// app.listen(PORT,()=>{
//     console.log(`server running at port ${PORT}`);
// })

//making the extension optional in the borwser if its index(.html)?


app.get('/new(.html)?',(req,res,next)=>{
    console.log('getting new page started');
    next();
},(req,res)=>{
    res.send('hello new friends');
})
//chaining route handklers
const one = (req,res,next)=>{
    console.log('one');
    next()
}
const two = (req,res,next)=>{
    console.log('two');
    next()

}
const three = (req,res)=>{
    console.log('three');
    res.send('finished')
}
app.get('/chain(.html)?',[one,two,three]);
//error handler for middleware
app.use(errHandler)
app.listen(PORT, ()=>console.log('server running at port ', PORT));