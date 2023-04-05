const express =require("express");
const {connection} = require("./config/db");
require('dotenv').config();
const {loginRoute} = require("./routes/login.routes")
const {bugRoute}= require("./routes/bug.routes");
const { Authentication } = require("./middlewere/bug.middlewere");
const cors=require("cors")


const port = process.env.Port;


const app =express();
app.use(express.json());

app.use(cors({
  origin:"*"
}))

app.get('/', (req, res) =>{
    res.send("welcome");
})

app.use("/",loginRoute)
app.use("/",Authentication)
app.use("/",bugRoute)


app.listen(port,async()=>{
    try {
      await connection
      console.log("connected to DB");
    } catch (error) {
      console.log(`error while listening on port ${port}`);
      console.log(error);
      
    }
    console.log(`listening on port ${port}`);
  });