const { set } = require('mongoose')
const Mechanic = require('../models/Mechanic')
const Appointment = require('../models/Appointment')
// const { DateTime } = require("luxon");

async function getAllMechanic(req, res) {
    try {
        const mechanics = await Mechanic.find()
        res.json(mechanics)        
    } catch(error){
        console.log('error fetching mechanic:', error)
        res.json({'message': 'error fetching mechanic'})
    }
}

async function getMechanicById(req, res) {
    try {
        const { id } = req.params
        const mechanic = await Mechanic.findById(id)
        if (!mechanic) throw new Error('error retrieving mechanic')
        res.json(mechanic)
    } catch(error){
        console.log('error fetching mechanic:', error)
        res.json({'message': 'error fetching mechanic'})
    }
}

function isInBuisnessDay(date){   
    const weekDay = date.getDay()
    return 1 <= weekDay && weekDay <= 5     
}

const startHour = 8 //8am
const endHour = 17 // 5pm

function createAvailableSpots(mechanicId, date){
    const availableSpots = []
    for(let i = startHour; i < endHour; i++){
        availableSpots.push({
            mechanicId:mechanicId,
            date: date.toString(),
            startHour: i,
        })          
    }
    return availableSpots 
}

async function getMechanicAvailability(req, res){
    try {        
        const { mechanic, appointmentDate } = req.query        
        const businessDay = isInBuisnessDay(new Date(appointmentDate))
        const appointmentsQuery =  await Appointment.find(req.query)         
        const potentiallyAvailableSpots = createAvailableSpots(mechanic, appointmentDate)

        if(businessDay != true){
            res.json([])
        }
        else{ 
            const availableSpots = potentiallyAvailableSpots.filter((spot) => !appointmentsQuery.some((appt) => appt.startHour === spot.startHour ))
            
            res.json(availableSpots)
        }                       
    } catch(error){
        console.log('error fetching appointment:', error) 
        res.json({'message': 'error fetching appointment'})
    }
}

async function createMechanic(req, res) {
    
    try {
        if (!req.body.image) req.body.image = undefined
        const mechanic = await new Mechanic(req.body).save()        
        const id = mechanic.id
        res.status(201).json({ 'message': 'mechanic created',id })
    } catch (error) {
        console.log('error creating mechanic:', error)
        res.json({ 'message': 'error creating mechanic' })
    }
}

async function updateMechanicById(req, res) {
    console.log(req.body)
    try {
        const { id } = req.params
        if (!req.body.image) req.body.image = undefined
        await Mechanic.findByIdAndUpdate(id, req.body)
        res.status(204).json({ 'message': 'mechanic updated' })
    } catch (error) {
        console.log('error updating mechanic:', error)
        res.json({ 'message': 'error updating mechanic' })
    }
}

async function deleteMechanicById(req, res) {
    try {
        const { id } = req.params
        await Mechanic.findByIdAndDelete(id)
        res.status(204).json({ 'message': 'mechanic deleted' })
    } catch (error) {
        console.log('error deleting mechanic:', error)
        res.json({ 'message': 'error deleting mechanic' })
    }
}

module.exports = {
    getAllMechanic,
    getMechanicById,
    createMechanic,
    deleteMechanicById,
    updateMechanicById,
    getMechanicAvailability,
    isInBuisnessDay,
    createAvailableSpots,
}