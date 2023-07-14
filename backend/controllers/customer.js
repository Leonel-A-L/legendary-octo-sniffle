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
    const {firstName, lastName, email, phoneNumber } = req.body
    const existingUser = await Customer.find({ firstName, lastName, email, phoneNumber })

    if(existingUser.length){
        res.json({ 'message': 'error user already exists'})
        return
    }
    
    try {
        
        const customer =  new Customer({firstName, lastName, email, phoneNumber })
        await customer.save()   
        res.status(201).json({ 'message': 'customer created',id: customer.id })
    } catch (error) {
        console.log('error creating customer:', error)
        res.json({ 'message': 'error creating customer' })
    }
}

async function userLogin(req, res){
    
    const {email, phoneNumber} = req.body
    const existingUser = await Customer.find({ email, phoneNumber})
    console.log(existingUser)
    try {
    if (existingUser.length)
        res.json({ 'message': 'User logged in' })        
    } catch(error){        
        res.json({'message': 'wrong email or phone number'})
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
    userLogin,
}