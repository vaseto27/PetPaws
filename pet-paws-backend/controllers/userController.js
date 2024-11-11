const UserProfile = require('../models/User');
const Pet = require('../models/Pet');

exports.getUserProfile = async (req, res) => {

    // old one 
    // try {
    //     const user = await User.findById(req.params.userId).populate('pets');
    //     res.json(user);
    // } catch (error) {
    //     res.status(500).json({message: error.message})
    // }
    console.log('trying to get users')
  try {
    console.log(req.userId)
    const userProfile = await UserProfile.findById(req.userId).populate('pets');
    if(!userProfile) {
        return res.status(404).json({error: 'User profile not found'})
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({error: 'Error fetching user profile'})
  }
}

exports.updateUserProfile = async (req, res) => {
   try {
    const userProfile = await UserProfile.findByIdAndUpdate(req.userId, req.body, {new: true});
    if(!userProfile) {
        return res.status(404).json({error: 'User profile not found'})
    }
    res.status(200).json(userProfile)
   } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
   }
}

exports.deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.userId);
        if(!userProfile) {
            return res.status(404).json({error: 'User profile not found'})
        }
        await Pet.deleteMany({ owner: userProfile._id});
        res.status(200).json({message: 'User profile and pets deleted succesfully'})
    } catch (error) {
        res.status(500).json({error: 'Error deleting user profile'})
    }
}

exports.addPetToUser = async (req, res) => {
    // old one
    // try {
    //     const pet = new Pet({
    //         name: req.body.name,
    //         species: req.body.species,
    //         age: req.body.age,
    //         owner: req.params.userId
    //     });


    //     await pet.save();

    //     const user = await User.findById(req.params.userId);
    //     user.pets.push(pet._id);
    //     await user.save();

    //     res.status(201).json(pet);
    // } catch (error) {
    //     res.status(500).json({message: error.message})
    // }
    try {
        const userProfile = await UserProfile.findById(req.userId);
        if(!userProfile) {
            return res.status(404).json({error: 'User profile not found'})
        }
        const { name, species, age} = req.body;
        const pet = new Pet({name, species, age, owner: userProfile._id});
        await pet.save();

        userProfile.pets.push(pet);
        await userProfile.save();

        res.status(201).json(pet);
    } catch (error) {
        res.status(500).json({ error: 'Error adding pet' });
    }
}