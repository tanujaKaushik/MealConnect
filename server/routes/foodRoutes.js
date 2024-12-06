const { submitFoodDonation, getAllFoodDonations } = require('../controllers/foodController');  // Import the controller functions

const router = require('express').Router();

// POST route to submit food donation (create a new donation)
router.post('/submitdonation', submitFoodDonation);

// GET route to fetch all food donations
router.get('/listdonations', getAllFoodDonations);

module.exports = router;
