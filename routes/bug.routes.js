const {bugModel} = require("../models/bug.model")
const express = require('express');
const bugRoute = express.Router();





// make a post route here

bugRoute.post("/create",async(req,res)=>{
    const payload = req.body;

    try {
        const new_bug = new bugModel(payload);
        await new_bug.save();
        res.send("Succesfully created")
    } catch (error) {
        console.log(error)
        res.send({"massage":"something went wrong when we create the post"})
    }
})

// make a get route

bugRoute.get("/bug",async(req,res)=>{
    const bug = req.query
    try {
        const NewBug = await bugModel.find(bug)
        
        res.send(NewBug)
    } catch (error) {
        console.log(error)
        res.send({"massage":"something wrong with the get route"})
    }
})


// make a patch or update route

bugRoute.patch("/update/:id",async(req,res)=>{
      const id = req.params.id ;
      const payload = req.body;
      const bug = await bugModel.findOne({"_id":id});
      const userID_in_bug = bug.bugID;
      const userID_making_req = req.body.bugID;

      try {
        if(userID_making_req!==userID_in_bug){
           res.send({"massage":"You are not authorized"})
        }else{
            const bugs = await bugModel.findOneAndUpdate({_id:id},payload)
          
            res.send({"massage":"The update has been done"})
        }
      } catch (error) {
        console.log(error)
        res.send({"massage":"Something went worng while updating."})
      }
})


// make a Delete route 

bugRoute.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const bugs = await bugModel.findOne({"_id":id});
    const bugId_in_bug = bugs.bugID;
    const bugID_in_req = req.body.bugID;

    try {
        if(bugID_in_req!==bugId_in_bug){
            res.send({"massage":"You are not authorized"})
        }else{
            const bugs = await bugModel.findOneAndDelete({_id:id})
            res.send({"massage":"The delete has been done successfully"})
        }
    } catch (error) {
        console.log(error);
        res.send({"massage":"somthing wrong with Delete Route"})
    }
})




module.exports = {
    bugRoute
}