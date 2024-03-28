const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const serviceSchema = mongoose.Schema({
    _id:{
        type:ObjectId
    },
    title:{
        type:String
    },
    cover:{
        type:String
    },
    exclusive:{
        type:Number
    },
    dateUploaded:{
        type:Date
    }
})

module.exports = mongoose.model('services',serviceSchema)