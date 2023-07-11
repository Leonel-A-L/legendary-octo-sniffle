const router = require('express').Router()
const {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    deleteAppointmentById,
    updateAppointmentById,
    getAllAvailaleAppointment,
} = require('../controllers/appointment')
// GET / get all appointments
router.get('/', getAllAppointment)

//Get /:mechanic get appointment by mechanic
// router.get('/mechanic/:id/', getAllAvailaleAppointment)

// GET /:id get appointment by id
router.get('/:id', getAppointmentById)

//POST / creat appointment
router.post('/', createAppointment)

// PUT /:id update
router.put('/:id', updateAppointmentById)
// DELETE /:id delete appointment by id
router.delete('/:id', deleteAppointmentById)

module.exports = router