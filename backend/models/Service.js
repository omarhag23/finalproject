const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    title:{
        type:String
    },
    cover:{
        type:String
    },
    packagerice:{
        type:Number
    },
    dateUploaded:{
        type:Date
    }
})

module.exports = mongoose.model('services',serviceSchema)