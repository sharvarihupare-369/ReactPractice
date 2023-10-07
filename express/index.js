const express = require("express")
const app = express()
const fs = require("fs")
app.use(express.json())

app.get("/",(req,res)=>{
    res.setHeader("Content-type","text/html")
    res.send("<h1>Home Page</h1>")
    // res.send("Home page")
})

app.get("/data",(req,res)=>{
    const dataStream = fs.createReadStream("./data.json","utf-8")
    dataStream.pipe(res)
})

app.post("/addata",(req,res)=>{
    console.log(req.body)
    res.send("Data added")
})


app.listen(4500,(req,res)=>{
    console.log("Server is listening on port 4500")
})