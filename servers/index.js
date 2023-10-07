const http = require("http")
const fs = require("fs")

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.setHeader("Content-type","text/html")
        res.end("<h1>Home Page</h1>")
    }else if(req.url == "/data"){
        try {
            const data = fs.readFileSync("./data.json","utf-8") 
            // res.end(data)
            const dataStream= fs.createReadStream("./data.json","utf-8")
            dataStream.pipe(res)
        } catch (error) {
            res.end(error)
        }
    }else if(req.url === "/adddata" && req.method=="POST"){
        let str = ""
        
        req.on("data",(chunk)=>{
            str += chunk
        })
        req.on("end",()=>{
          console.log(str)
        })
      //   console.log(str)
        res.end("Data added")
      }
})



server.listen(4500,()=>{
    console.log("Server is listening on port 8080")
})

fs.writeFile("text.txt","This is line one \n",(err)=>{
    if(err) console.log(err)
})

fs.appendFile("text.txt","This is second line \n",(err)=>{
    if(err)console.log(err)
})

fs.readFile("text.txt","utf-8",(err,data)=>{
    if(err) console.log(err)
    else console.log(data)
})

fs.rename("text.txt","file.txt",(err)=>{
    if(err)console.log(err)
})

// fs.unlinkSync("text.txt")
