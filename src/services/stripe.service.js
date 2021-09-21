const stripe = require('stripe')

const Stripe = stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
})

const addNewCustomer = async (email) => {
    const customer = await Stripe.customers.create({
        email,
        description: 'New Customer'
    })

    return customer
}

const getCustomerByID = async (id) => {
    const customer = await Stripe.customers.retrieve(id)
    return customer
}

module.exports = {
    addNewCustomer,
    getCustomerByID
}