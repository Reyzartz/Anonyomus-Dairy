const { Schema, model } = require('mongoose')

const pageSchema = new Schema({
    snippet:{
        type:String,
        required:[true,"Enter "]
    },
    handwritingFont:{
        type:String
    },
    authorId:{
        type:String,
        required:true,
    },
},{timestamps:true})

const Page = new model("page",pageSchema)

module.exports = Page