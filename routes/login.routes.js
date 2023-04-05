const {loginModel} =require("../models/login.model");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const secret_key = process.env.secret_key

const loginRoute = express.Router();

loginRoute.post('/signup', async (req, res) => {
    const { email, password} = req.body;
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new loginModel({ email, password: secure_password})
                await user.save();
                res.send("Registed Successfully")
            }
        });
    } catch (error) {
        res.send("error in registration the user")
        console.log(error);
    }
 

});



loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // const user = await userModel.findOne({email:email,pass:pass});//this is the traditional way to do it 
        const user = await loginModel.find({ email });// this is the ES6 way to do it the same 
        const new_pass = user[0].password
        

        if (user.length > 0) {
            bcrypt.compare(password, new_pass, (err, result) =>{
                if(result){
                    // var token = jwt.sign({ course: 'backend' }, secret_key);
                    var token = jwt.sign({ userID:user[0]._id }, secret_key);
                    res.send({ "massege": "Login successfully", "token": token });
                }else{
                    res.send("wrong Cridntial in bcrypt");
                }
            });
            
        } else {
            res.send("wrong Cridntial");
        }
    } catch (error) {
        console.log(error);
        res.send({ "mass": "something went wrong" });

    }

});


module.exports = {
    loginRoute
}