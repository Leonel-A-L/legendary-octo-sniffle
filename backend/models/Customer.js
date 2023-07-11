const mongoose = require('mongoose')
const { INTEGER } = require('sequelize')

const customerSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
      type: String
    },
    phoneNumber:{
        type:Number
    },   
})

module.exports = mongoose.model('Customer', customerSchema)