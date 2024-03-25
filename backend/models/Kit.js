const mongoose = require('mongoose')

const kitSchema = mongoose.Schema({
    title:{
        type:String
    },
    cover:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    dateUploaded:{
        type:Date
    }
})

module.exports = mongoose.model('kits',kitSchema)