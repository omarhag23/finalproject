const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const beatSchema = mongoose.Schema({
    _id:{
        type:ObjectId
    },
    title:{
        type:String
    },
    bpm:{
        type:Number
    },
    key:{
        type:String
    },
    cover:{
        type:String
    },
    category:{
        type:String
    },
    mp3Price:{
        type:Number
    },
    wavPrice:{
        type:Number
    },
    exclusivePrice:{
        type:String
    },
    dateUploaded:{
        type:Date
    }
})

module.exports = mongoose.model('beats',beatSchema)