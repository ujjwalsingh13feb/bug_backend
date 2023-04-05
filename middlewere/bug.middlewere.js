const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.secret_key;


const Authentication = (req,res,next)=>{
    const token = req.headers.authorization

    if(token) {
        const decoded = jwt.verify(token,secret_key)

        if(decoded){
            const bugId = decoded.bugId
            // console.log(bugId)
            req.body.bugId = bugId
            next()

        }else{
            res.send("wrong credntials")
        }
    }else{
        res.send("Please login first")
    }
}

module.exports = {
    Authentication
}