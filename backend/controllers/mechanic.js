const { set } = require("mongoose");
const Mechanic = require("../models/Mechanic");
const Appointment = require("../models/Appointment");

// Gets all the mechanics
async function getAllMechanic(req, res) {
  try {
    const mechanics = await Mechanic.find();
    res.json(mechanics);
  } catch (error) {
    res.json({ message: "error fetching mechanic" });
  }
}

// Gets mechanic by id
async function getMechanicById(req, res) {
  try {
    const { id } = req.params;
    const mechanic = await Mechanic.findById(id);
    if (!mechanic) throw new Error("error retrieving mechanic");
    res.json(mechanic);
  } catch (error) {
    res.json({ message: "error fetching mechanic" });
  }
}

// Function to check if its on a buisness day
function isInBuisnessDay(date) {
  const weekDay = date.getDay();
  return 0 <= weekDay && weekDay <= 4;
}

const startHour = 8; //8am
const endHour = 17; // 5pm

// creates spots for the mechanics to work on based on a 1 hour appointment schedule
function createAvailableSpots(mechanicId, date) {
  const availableSpots = [];
  for (let i = startHour; i < endHour; i++) {
    availableSpots.push({
      mechanicId: mechanicId,
      date: date.toString(),
      startHour: i,
    });
  }
  return availableSpots;
}

// Gets to check if the mechanic is available on that day, time and not booked
async function getMechanicAvailability(req, res) {
  try {
    const { mechanic, appointmentDate } = req.query;
    const businessDay = isInBuisnessDay(new Date(appointmentDate));
    const appointmentsQuery = await Appointment.find(req.query);
    const potentiallyAvailableSpots = createAvailableSpots(
      mechanic,
      appointmentDate
    );

    if (businessDay != true) {
      res.json([]);
    } else {
      const availableSpots = potentiallyAvailableSpots.filter(
        (spot) =>
          !appointmentsQuery.some((appt) => appt.startHour === spot.startHour)
      );

      res.json(availableSpots);
    }
  } catch (error) {
    res.json({ message: "error fetching appointment" });
  }
}

// Creates the mechanic
async function createMechanic(req, res) {
  try {
    if (!req.body.image) req.body.image = undefined;
    const mechanic = await new Mechanic(req.body).save();
    const id = mechanic.id;
    res.status(201).json({ message: "mechanic created", id });
  } catch (error) {
    res.json({ message: "error creating mechanic" });
  }
}

// Updates the mechanic based on the ID
async function updateMechanicById(req, res) {
  try {
    const { id } = req.params;
    if (!req.body.image) req.body.image = undefined;
    await Mechanic.findByIdAndUpdate(id, req.body);
    res.status(204).json({ message: "mechanic updated" });
  } catch (error) {
    res.json({ message: "error updating mechanic" });
  }
}

// Deletes the mechanic by id
async function deleteMechanicById(req, res) {
  try {
    const { id } = req.params;
    await Mechanic.findByIdAndDelete(id);
    res.status(204).json({ message: "mechanic deleted" });
  } catch (error) {
    res.json({ message: "error deleting mechanic" });
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
};
