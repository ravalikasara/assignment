require('dotenv').config()
const express = require('express')
const app = express()
const port = 3001
app.get('/', (req, res) =>{
  res.send('Hello World')
  console.log("hi")
})
app.get('/twitter', (req, res)=> {
    res.send('Hello World')
    console.log("hi hi")
  })
app.listen(process.env.PORT,()=>{
    console.log("app listening at ",`${port}`)
})