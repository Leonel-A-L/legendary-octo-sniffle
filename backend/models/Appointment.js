const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'mechanic'
    },
    appointmentDate: {
      type: Date
    },
    customer: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },  
    appointmentTime:{
        type:Number
    },
    reason: {
      type: String,      
    },
  
})

module.exports = mongoose.model('Appointment', appointmentSchema)