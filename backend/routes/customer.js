const router = require("express").Router();
const {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  deleteCustomerById,
  updateCustomerById,
} = require("../controllers/customer");
// GET / get all customers
router.get("/", getAllCustomer);

// GET /:id get customers by id
router.get("/:id", getCustomerById);

//POST / create customers
router.post("/", createCustomer);

// PUT /:id update
router.put("/:id", updateCustomerById);

// DELETE /:id delete customer by id
router.delete("/:id", deleteCustomerById);

// POST /login
router.post("/userlogin", userLogin);

module.exports = router;
