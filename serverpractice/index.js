// const os = require("os")
// console.log(os.freemem()) //returns free memory of system in bytes;
// console.log(os.cpus())  //returns cpu details of system
// console.log(os.cpus()[0].model)  //returns cpu details of system
// console.log(os.version())  //  version of os


// //fs dns path


// const fs = require("fs")

// fs.writeFileSync("text.txt","I am learning Node for the first time!!")

// fs.writeFile("text.txt","I am learning Node for the first time!!",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Data has been entered")
//     }
// })


// fs.appendFile("text.txt","This is first line\n",(err)=>{
//     if(err) console.log(err)
//     else console.log("appended!")
// })

// fs.appendFile("text.txt","This is second line\n",(err)=>{
//     if(err) console.log(err)
//     else console.log("appended!")
// })

// fs.readFile("text.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

// try {
//     let data = fs.readFileSync("text.txt","utf-8")
//     console.log(data)
// } catch (error) {
//     console.log(error)
// }


const http = require("http")
const fs = require("fs")

// console.log(http.createServer())
const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.setHeader("Content-type","text/html")
        res.end("<h1>Home Page</h1>")
    }else if(req.url === "/data"){
        // fs.readFile("./data.json","utf-8",(err,data)=>{
        //     if(err){
        //         res.write(err)
        //         res.end()
        //     }else {
        //         res.end(data)
        //         // res.end("Some data will be sent")
        //     }
        // })
        const dataStream = fs.createReadStream("./data.json","utf-8")
        dataStream.pipe(res)
        
    }else if(req.url === "/blogs"){
        // res.end("Blog data")
        try {
            const data = fs.readFileSync("./posts.json")
            res.end(data)
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
    else{
        // res.end("Invalid endpoint")
        res.end(http.STATUS_CODES["404"])
    }
})

server.listen(8080,()=>{
    console.log("Server is running on port 8080")
})



// fs.writeFile("text.txt",)