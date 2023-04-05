const mongoose = require('mongoose')

const LoginSchema =mongoose.Schema({
    email:String,
    password:String

},{
    versionKey:false,
})

const loginModel = mongoose.model("Login",LoginSchema)


module.exports = {
    loginModel
}