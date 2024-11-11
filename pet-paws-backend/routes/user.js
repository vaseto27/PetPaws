const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('pets');
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/:userId/pets', async (req,res) => {
    try {
        const pet = new Pet({
            name: req.body.name,
            species: req.body.species,
            age: req.body.age,
            owner: req.params.userId
        });


        await pet.save();

        const user = await User.findById(req.params.userId);
        user.pets.push(pet._id);
        await user.save();

        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;