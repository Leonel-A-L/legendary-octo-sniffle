const Appointment = require('../models/Appointment')
const Mechanic = require('../models/Mechanic')
const {
    getAllMechanic,
    getMechanicById,
    createMechanic,
    deleteMechanicById,
    updateMechanicById,
    getMechanicAvailability,
    isInBuisnessDay,
    createAvailableSpots,
    
} = require('../controllers/mechanic')

async function getAllAppointment(req, res) {
    try {
        const appointments = await Appointment.find()
        res.json(appointments)        
    } catch(error){
        console.log('error fetching appointment:', error)
        res.json({'message': 'error fetching appointment'})
    }
}
async function getAllAvailaleAppointment(req, res){
    try {        
        const availableAppointment = await Appointment.findBy(mechanic)        
        console.log(availableAppointment)
    } catch(error){
        console.log('error fetching appointment:', error)
        res.json({'message': 'error fetching appointment'})
    }
}

async function getAppointmentById(req, res) {
    try {
        const { id } = req.params
        const appointment = await Appointment.findById(id)
        if (!appointment) throw new Error('error retrieving appointment')
        res.json(appointment)
    } catch(error){
        console.log('error fetching appointment:', error)
        res.json({'message': 'error fetching appointment'})
    }
}

async function createAppointment(req, res) {
    const { customer, mechanic, appointmentDate, appointmentTime } = req.body
    const existingMechanicAppointment =await Appointment.find({ mechanic, appointmentDate, appointmentTime})

    if (existingMechanicAppointment.length()){
        res.json({ 'message': 'error creating appointment; an appointment already exists' })
        return
    }
     
    try {          
        const appointment = new Appointment({ customer, mechanic, appointmentDate, appointmentTime })
        await appointment.save()
        res.status(201).json({ 'message': 'appointment created', id: appointment.id})
         
        }catch (error) {
        console.log('error creating appointment:', error)
        res.json({ 'message': 'error creating appointment' })
    }    
}

async function updateAppointmentById(req, res) {
    console.log(req.body)
    try {
        const { id } = req.params
        if (!req.body.image) req.body.image = undefined
        await Appointment.findByIdAndUpdate(id, req.body)
        res.status(204).json({ 'message': 'appointment updated' })
    } catch (error) {
        console.log('error updating appointment:', error)
        res.json({ 'message': 'error updating appointment' })
    }
}

async function deleteAppointmentById(req, res) {
    try {
        const { id } = req.params
        await Appointment.findByIdAndDelete(id)
        res.status(204).json({ 'message': 'appointment deleted' })
    } catch (error) {
        console.log('error deleting appointment:', error)
        res.json({ 'message': 'error deleting appointment' })
    }
}

module.exports = {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    deleteAppointmentById,
    updateAppointmentById,
    getAllAvailaleAppointment,
}