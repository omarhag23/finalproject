const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;
const kitSchema = mongoose.Schema({
    _id:{
        type:ObjectId
    },
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