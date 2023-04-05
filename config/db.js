const mongoose = require('mongoose')
require("dotenv").config()

const DataBase = process.env.url

const connection = mongoose.connect(DataBase)

module.exports ={
    connection
}