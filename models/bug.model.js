const mongoose = require("mongoose")

const bugSchema= mongoose.Schema({
    title:String,
},{
    versionKey:false
})

const bugModel = mongoose.model("bugTracker",bugSchema)


module.exports = {
    bugModel
}