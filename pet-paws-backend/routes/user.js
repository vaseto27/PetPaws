const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('', authMiddleware, userProfileController.getUserProfile);

router.put('', authMiddleware, userProfileController.updateUserProfile);

router.delete('', authMiddleware, userProfileController.deleteUserProfile)

router.post('/pets',authMiddleware, userProfileController.addPetToUser);

module.exports = router;