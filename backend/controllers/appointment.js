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

// still wroking on Route
async function createAppointment(req, res) {
    //  const existingAppointment = await Appointment.find(req.query.mechanic,req.query.appointmentDate, req.query.appointmentTime)
    // const searchMechanic = await Appointment.find(req.query.mechanic)
    // console.log('Existing', existingAppointment,'Mechanic', searchMechanic)
    const existingMechanicAppointment = await (await Appointment.find().where('mechanic').equals(req.body.mechanic)).sort()
    const { mechanic, appointmentDate, appointmentTime } = req.body     
    const checkNewAppointment = { mechanic, appointmentDate, appointmentTime }    
    console.log('TEST', existingMechanicAppointment, 'Hopefully', checkNewAppointment)
      
   
     
    try {          
        // if(existingMechanicAppointment.mechanic == checkNewAppointment.mechanic){res.status(400).json({'message': 'appointment already created'})}
        // else{
        if (!req.body.image) req.body.image = undefined
        const appointment = await new Appointment(req.body)
        const id = appointment.id        
        res.status(201).json({ 'message': 'appointment created',id })
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