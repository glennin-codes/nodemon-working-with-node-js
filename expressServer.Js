
const express = require('express');
const app=express();
const path=require ('path');
const {logger}=require('./middleware/logEvents')
const errHandler=require('./middleware/errHandler')
const cors = require('cors')
const router=require('./routers/subdir')
const PORT= process.env.PORT||3500




//using cross origin Resource sharing
const whitelist=['http://www.google.com','http://127.0.0.1:5500/', 'http://localhost:3500']
   const corsOption= {
   origin:(origin,callback)=>{
      if(whitelist.indexOf(origin)!== -1||!origin){
        callback(null,true)
      }else{
        callback(new Error ('not allowed CORS'));
      }
      
   },
   optionsSuccessStatus:200
}
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
app.use('/subdir',require('./routers/subdir'))


//using custom middleware
app.use(logger)


// app.get('/',(req,res)=>{ 
//     res.send('hello world')
// })
// app.listen(PORT,()=>{
//     console.log(`server running at port ${PORT}`);
// })

//making the extension optional in the borwser if its index(.html)?
app.get('^/$|/index(.html)?' ,(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('^/about|/about-us(.html)',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','about-us.html'))
});
//ridirecting to homepage
app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/index.html');
})

//if a user reaches out a page which isn't structured in the code

// app.get('/*',(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','404.html'))
// })
 //route handlers app.all
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
 })


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