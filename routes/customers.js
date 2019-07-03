const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customer');

router.get('/', async (req, res) => {
    res.send(await Customer.find());
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    await Customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    let customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        {
            new: true
        }
    );
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
});

module.exports = router;