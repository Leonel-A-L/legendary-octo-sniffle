const Customer = require("../models/Customer");

//Get all customers
async function getAllCustomer(req, res) {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.json({ message: "error fetching customer" });
  }
}

//Gets customer by the ID
async function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) throw new Error("error retrieving customer");
    res.json(customer);
  } catch (error) {
    res.json({ message: "error fetching customer" });
  }
}
// Creates the customers
async function createCustomer(req, res) {
  const { firstName, lastName, email, phoneNumber } = req.body;
  const existingUser = await Customer.find({
    firstName,
    lastName,
    email,
    phoneNumber,
  });

  if (existingUser.length) {
    res.json({ message: "error user already exists" });
    return;
  }

  try {
    const customer = new Customer({ firstName, lastName, email, phoneNumber });
    await customer.save();
    res.status(201).json({ message: "customer created", id: customer.id });
  } catch (error) {
    res.json({ message: "error creating customer" });
  }
}

// Customer log in
async function userLogin(req, res) {
  const { email, phoneNumber } = req.body;
  const existingUser = await Customer.find({ email, phoneNumber });

  if (!existingUser.length) {
    res.json({ message: "wrong email or phone number" });
  } else {
    res.json({ message: "user loged in" });
  }
}
// Updates the customer by ID
async function updateCustomerById(req, res) {
  try {
    const { id } = req.params;
    if (!req.body.image) req.body.image = undefined;
    await Customer.findByIdAndUpdate(id, req.body);
    res.status(204).json({ message: "customer updated" });
  } catch (error) {
    res.json({ message: "error updating customer" });
  }
}

// Delete the customer by the ID
async function deleteCustomerById(req, res) {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(204).json({ message: "customer deleted" });
  } catch (error) {
    res.json({ message: "error deleting customer" });
  }
}

module.exports = {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  deleteCustomerById,
  updateCustomerById,
  userLogin,
};
