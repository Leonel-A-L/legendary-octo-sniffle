const Customer = require('../models/Customer')

async function getAllCustomer(req, res) {
    try {
        const customers = await Customer.find()
        res.json(customers)        
    } catch(error){
        console.log('error fetching customer:', error)
        res.json({'message': 'error fetching customer'})
    }
}

async function getCustomerById(req, res) {
    try {
        const { id } = req.params
        const customer = await Customer.findById(id)
        if (!customer) throw new Error('error retrieving customer')
        res.json(customer)
    } catch(error){
        console.log('error fetching customer:', error)
        res.json({'message': 'error fetching customer'})
    }
}

async function createCustomer(req, res) {
    
    try {
        if (!req.body.image) req.body.image = undefined
        const customer = await new Customer(req.body).save()        
        const id = customer.id
        res.status(201).json({ 'message': 'customer created',id })
    } catch (error) {
        console.log('error creating customer:', error)
        res.json({ 'message': 'error creating customer' })
    }
}

async function updateCustomerById(req, res) {
    console.log(req.body)
    try {
        const { id } = req.params
        if (!req.body.image) req.body.image = undefined
        await Customer.findByIdAndUpdate(id, req.body)
        res.status(204).json({ 'message': 'customer updated' })
    } catch (error) {
        console.log('error updating customer:', error)
        res.json({ 'message': 'error updating customer' })
    }
}

async function deleteCustomerById(req, res) {
    try {
        const { id } = req.params
        await Customer.findByIdAndDelete(id)
        res.status(204).json({ 'message': 'customer deleted' })
    } catch (error) {
        console.log('error deleting customer:', error)
        res.json({ 'message': 'error deleting customer' })
    }
}

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    deleteCustomerById,
    updateCustomerById,
}