const http=require('http')
const Path =require ('path')
const fs =require('fs')
const fsPromise=require ('fs')
//the port to be used
const PORT= process.env.PORT||3000

const server= http.createServer((req,res)=>{
    console.log(req.url,req.method);
    let path;
    if (req.url==='/' || req.url==='index.html'){
        res.statusCode=200;
        res.setHeader('content-Type','text/html' ,'text/css')
        path=Path.join(__dirname, 'views','index.html')
        fs.readFile(path, 'utf8',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.end(data)
            }
        })
    }
})
server.listen(PORT,()=>console.log(`starting server at ${PORT}`))

