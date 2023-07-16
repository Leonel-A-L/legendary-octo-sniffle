const Appointment = require("../models/Appointment");
const Mechanic = require("../models/Mechanic");
const { isInBuisnessDay } = require("../controllers/mechanic");

// Gets all appointments
async function getAllAppointment(req, res) {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.json({ message: "error fetching appointment" });
  }
}

// Gets all available appointments
async function getAllAvailaleAppointment(req, res) {
  try {
    const availableAppointment = await Appointment.findBy(mechanic);
  } catch (error) {
    res.json({ message: "error fetching appointment" });
  }
}

// Gets appointments customer by the ID
async function getAppointmentById(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new Error("error retrieving appointment");
    res.json(appointment);
  } catch (error) {
    res.json({ message: "error fetching appointment" });
  }
}

// Creates appointment
async function createAppointment(req, res) {
  const { customer, mechanic, appointmentDate, appointmentTime } = req.body;

  const inBuisnessDay = await isInBuisnessDay(new Date(appointmentDate)); // checks if is in buisness day

  const currentDate = new Date().getTime();
  const appointmentDateRequested = new Date(appointmentDate);
  const futureDate = new Date(currentDate + 36500000000);
  const pastDate = new Date(currentDate - 1000000);

  const time = appointmentTime;
  const beforeBuisnessOpen = time < 8;
  const afterBuisnessClose = time > 16;

  const existingMechanicAppointment = await Appointment.find({
    mechanic,
    appointmentDate,
    appointmentTime,
  }); // checks if that appoinment is already created

  if (
    appointmentDateRequested <= pastDate ||
    appointmentDateRequested > futureDate ||
    inBuisnessDay == false ||
    beforeBuisnessOpen ||
    afterBuisnessClose
  ) {
    res.json({ message: "error wrong time" });
    return; // checks if its too far in the past, future, if in buisness day and hours
  } else {
    if (existingMechanicAppointment.length) {
      res.json({
        message: "error creating appointment; an appointment already exists",
      });
      return;
    }
  }

  try {
    const appointment = new Appointment({
      customer,
      mechanic,
      appointmentDate,
      appointmentTime,
    });
    await appointment.save();
    res
      .status(201)
      .json({ message: "appointment created", id: appointment.id });
  } catch (error) {
    res.json({ message: "error creating appointment" });
  }
}

// Updates customer by the ID
async function updateAppointmentById(req, res) {
  try {
    const { id } = req.params;
    if (!req.body.image) req.body.image = undefined;
    await Appointment.findByIdAndUpdate(id, req.body);
    res.status(204).json({ message: "appointment updated" });
  } catch (error) {
    res.json({ message: "error updating appointment" });
  }
}

// Deletes customer by the ID
async function deleteAppointmentById(req, res) {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(204).json({ message: "appointment deleted" });
  } catch (error) {
    res.json({ message: "error deleting appointment" });
  }
}

module.exports = {
  getAllAppointment,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  updateAppointmentById,
  getAllAvailaleAppointment,
};
