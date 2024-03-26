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
    mp3price:{
        type:Number
    },
    wavprice:{
        type:Number
    },
    exclusive:{
        type:Number
    },
    dateUploaded:{
        type:Date
    },
    mp3path:{
        type:String
    },
    wavpath:{
        type:String
    },
})

module.exports = mongoose.model('beats',beatSchema)