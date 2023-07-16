const router = require("express").Router();
const {
  getAllMechanic,
  getMechanicById,
  createMechanic,
  deleteMechanicById,
  updateMechanicById,
  getMechanicAvailability,
} = require("../controllers/mechanic");
// GET / get all appointments
router.get("/", getAllMechanic);

router.get("/availability", getMechanicAvailability);

// GET /:id get appointment by id
router.get("/:id", getMechanicById);

//POST / creat appointment
router.post("/", createMechanic);

// PUT /:id update
router.put("/:id", updateMechanicById);
// DELETE /:id delete appointment by id
router.delete("/:id", deleteMechanicById);

module.exports = router;
